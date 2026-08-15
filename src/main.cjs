const {
  app,
  BrowserWindow,
  Menu,
  dialog,
  ipcMain,
  session,
  shell,
} = require('electron');
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const PRODUCT_NAME = 'Harness Orbit';
const MARKET_URL = 'https://github.com/topics/dsh-plugin';
const ORBIT_PACKAGE = '@local/dsh-ui-orbit';
const isSmokeTest = process.argv.includes('--smoke-test');

let mainWindow = null;
let backend = null;
let backendUrl = null;
let quitting = false;
let stoppingBackend = false;
let logFile = '';

app.setName(PRODUCT_NAME);
app.setAppUserModelId('com.deepseek.harness.orbit');

const singleInstance = app.requestSingleInstanceLock();
if (!singleInstance) {
  app.quit();
}

function appendLog(message) {
  const line = `[${new Date().toISOString()}] ${String(message).trimEnd()}${os.EOL}`;
  try {
    fs.mkdirSync(path.dirname(logFile), { recursive: true });
    fs.appendFileSync(logFile, line, 'utf8');
  } catch {
    // Logging must never prevent Harness from starting.
  }
}

function appRoot() {
  return app.getAppPath();
}

function dshBinPath() {
  return path.join(appRoot(), 'node_modules', '@deepseek-ai', 'dsh', 'lib', 'bin.js');
}

function pnpmBinPath() {
  return path.join(appRoot(), 'node_modules', 'pnpm', 'bin', 'pnpm.cjs');
}

function templateRoot() {
  return app.isPackaged
    ? path.join(process.resourcesPath, 'profile-template')
    : path.join(__dirname, '..', 'profile-template');
}

function resolveDshHome() {
  const configured = process.env.DSH_HOME?.trim();
  return configured || path.join(app.getPath('home'), '.dsh');
}

function desktopSettingsPath() {
  return path.join(app.getPath('userData'), 'desktop-settings.json');
}

function loadDesktopSettings() {
  try {
    const value = JSON.parse(fs.readFileSync(desktopSettingsPath(), 'utf8'));
    if (typeof value.workspace === 'string' && fs.statSync(value.workspace).isDirectory()) {
      return { workspace: path.resolve(value.workspace) };
    }
  } catch {
    // A missing or stale setting falls back to Documents.
  }
  return { workspace: app.getPath('documents') };
}

function saveDesktopSettings(settings) {
  fs.mkdirSync(path.dirname(desktopSettingsPath()), { recursive: true });
  fs.writeFileSync(desktopSettingsPath(), `${JSON.stringify(settings, null, 2)}\n`, 'utf8');
}

function copyDirectory(source, destination) {
  fs.mkdirSync(destination, { recursive: true });
  fs.cpSync(source, destination, { recursive: true, force: true });
}

function ensureOrbitPatch(patchPath) {
  const orbitPatch = [
    "- id: ui-layout",
    "  name: '@deepseek-ai/dsh-client-ui-layout'",
    '  disabled: true',
    '',
    '- insert:',
    '    - id: ui-orbit',
    `      name: '${ORBIT_PACKAGE}'`,
    '',
  ].join('\n');

  if (!fs.existsSync(patchPath)) {
    fs.writeFileSync(patchPath, orbitPatch, 'utf8');
    return;
  }

  const existing = fs.readFileSync(patchPath, 'utf8');
  if (existing.includes(ORBIT_PACKAGE)) return;

  const meaningful = existing
    .split(/\r?\n/)
    .map((line) => line.replace(/#.*$/, '').trim())
    .filter(Boolean)
    .join('');
  const next = meaningful === '[]'
    ? orbitPatch
    : `${existing.trimEnd()}\n\n${orbitPatch}`;
  fs.writeFileSync(patchPath, next, 'utf8');
}

function ensureHarnessProfile() {
  const home = resolveDshHome();
  const profileDir = path.join(home, 'profiles', 'web');
  const profileModules = path.join(profileDir, 'node_modules', '@local', 'dsh-ui-orbit');
  const managedPlugin = path.join(profileDir, 'plugins', 'dsh-ui-orbit');
  const sourcePlugin = path.join(templateRoot(), 'plugins', 'dsh-ui-orbit');
  const manifestPath = path.join(profileDir, 'package.json');
  const workspacePath = path.join(profileDir, 'pnpm-workspace.yaml');

  fs.mkdirSync(profileDir, { recursive: true });
  if (!fs.existsSync(sourcePlugin)) {
    throw new Error(`内置 Orbit 插件缺失：${sourcePlugin}`);
  }

  let manifest = {
    name: 'dsh-profile-web',
    private: true,
    dependencies: {},
    dsh: {
      profile: {
        bundles: ['@deepseek-ai/dsh-base', '@deepseek-ai/dsh-web-app'],
      },
    },
  };
  if (fs.existsSync(manifestPath)) {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  }
  manifest.dependencies = {
    ...(manifest.dependencies || {}),
    [ORBIT_PACKAGE]: 'file:plugins/dsh-ui-orbit',
  };
  manifest.dsh = manifest.dsh || {};
  manifest.dsh.profile = manifest.dsh.profile || {};
  if (!Array.isArray(manifest.dsh.profile.bundles)) {
    manifest.dsh.profile.bundles = ['@deepseek-ai/dsh-base', '@deepseek-ai/dsh-web-app'];
  }
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  if (!fs.existsSync(workspacePath)) {
    fs.writeFileSync(
      workspacePath,
      'packages:\n  - .\n\nnodeLinker: hoisted\nautoInstallPeers: false\n',
      'utf8',
    );
  }
  ensureOrbitPatch(path.join(profileDir, 'cordis.patch.yml'));
  copyDirectory(sourcePlugin, managedPlugin);
  copyDirectory(sourcePlugin, profileModules);

  fs.writeFileSync(
    path.join(home, '.harness-orbit-profile.json'),
    `${JSON.stringify({ appVersion: app.getVersion(), orbitPackage: ORBIT_PACKAGE }, null, 2)}\n`,
    'utf8',
  );
  return { home, profileDir };
}

function quoteCmdPath(value) {
  return String(value).replace(/%/g, '%%').replace(/"/g, '""');
}

function quoteShellPath(value) {
  return `'${String(value).replace(/'/g, `'\\''`)}'`;
}

function ensureRuntimeShims() {
  const runtimeBin = path.join(app.getPath('userData'), 'runtime-bin');
  fs.mkdirSync(runtimeBin, { recursive: true });

  if (process.platform !== 'win32') {
    const executable = quoteShellPath(process.execPath);
    const dshBin = quoteShellPath(dshBinPath());
    const pnpmBin = quoteShellPath(pnpmBinPath());
    const prefix = '#!/bin/sh\nexport ELECTRON_RUN_AS_NODE=1\n';
    const shims = {
      dsh: `${prefix}exec ${executable} --expose-internals ${dshBin} "$@"\n`,
      pnpm: `${prefix}exec ${executable} ${pnpmBin} "$@"\n`,
      node: `${prefix}exec ${executable} "$@"\n`,
    };
    for (const [name, contents] of Object.entries(shims)) {
      const shimPath = path.join(runtimeBin, name);
      fs.writeFileSync(shimPath, contents, 'utf8');
      fs.chmodSync(shimPath, 0o755);
    }
    return runtimeBin;
  }

  const executable = quoteCmdPath(process.execPath);
  const dshBin = quoteCmdPath(dshBinPath());
  const pnpmBin = quoteCmdPath(pnpmBinPath());
  const prefix = '@echo off\r\nset "ELECTRON_RUN_AS_NODE=1"\r\n';
  fs.writeFileSync(
    path.join(runtimeBin, 'dsh.cmd'),
    `${prefix}"${executable}" --expose-internals "${dshBin}" %*\r\n`,
    'utf8',
  );
  fs.writeFileSync(
    path.join(runtimeBin, 'pnpm.cmd'),
    `${prefix}"${executable}" "${pnpmBin}" %*\r\n`,
    'utf8',
  );
  fs.writeFileSync(
    path.join(runtimeBin, 'node.cmd'),
    `${prefix}"${executable}" %*\r\n`,
    'utf8',
  );
  return runtimeBin;
}

function isTrustedAppNavigation(target) {
  try {
    const parsed = new URL(target);
    if (parsed.protocol === 'file:') {
      const allowed = [
        path.join(__dirname, 'splash.html'),
        path.join(__dirname, 'error.html'),
      ].map((file) => pathToFileURL(file).pathname.toLowerCase());
      return allowed.includes(parsed.pathname.toLowerCase());
    }
    return backendUrl !== null && parsed.origin === new URL(backendUrl).origin;
  } catch {
    return false;
  }
}

function openExternalIfSafe(target) {
  try {
    const parsed = new URL(target);
    if (parsed.protocol === 'https:' || parsed.protocol === 'mailto:') {
      void shell.openExternal(parsed.toString());
    }
  } catch {
    // Invalid external links are ignored.
  }
}

function configureSessionSecurity() {
  const appSession = session.defaultSession;
  appSession.setPermissionCheckHandler(() => false);
  appSession.setPermissionRequestHandler((_webContents, _permission, callback) => callback(false));
}

function createMainWindow() {
  const window = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 980,
    minHeight: 640,
    show: false,
    title: PRODUCT_NAME,
    backgroundColor: '#0b0c12',
    autoHideMenuBar: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
    },
  });

  window.webContents.setWindowOpenHandler(({ url }) => {
    openExternalIfSafe(url);
    return { action: 'deny' };
  });
  window.webContents.on('will-navigate', (event, url) => {
    if (isTrustedAppNavigation(url)) return;
    event.preventDefault();
    openExternalIfSafe(url);
  });
  window.webContents.on('will-redirect', (event, url) => {
    if (isTrustedAppNavigation(url)) return;
    event.preventDefault();
    openExternalIfSafe(url);
  });
  window.on('closed', () => {
    if (mainWindow === window) mainWindow = null;
  });
  window.once('ready-to-show', () => window.show());
  void window.loadFile(path.join(__dirname, 'splash.html'));
  return window;
}

function waitForHttp(url, timeoutMs = 30000) {
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const attempt = () => {
      const request = http.get(url, { timeout: 2500 }, (response) => {
        response.resume();
        if ((response.statusCode || 500) < 400) {
          resolve(response.statusCode);
          return;
        }
        retry(new Error(`HTTP ${response.statusCode}`));
      });
      request.on('timeout', () => request.destroy(new Error('request timeout')));
      request.on('error', retry);
    };
    const retry = (lastError) => {
      if (Date.now() - started >= timeoutMs) {
        reject(new Error(`Harness 服务启动超时：${lastError.message}`));
        return;
      }
      setTimeout(attempt, 250);
    };
    attempt();
  });
}

function startBackend() {
  const { home } = ensureHarnessProfile();
  const runtimeBin = ensureRuntimeShims();
  const settings = loadDesktopSettings();
  const dshBin = dshBinPath();
  if (!fs.existsSync(dshBin)) throw new Error(`Harness 引擎缺失：${dshBin}`);

  const environment = {
    ...process.env,
    DSH_HOME: home,
    DSH_TELEMETRY_DISABLED: '1',
    ELECTRON_RUN_AS_NODE: '1',
    NO_COLOR: '1',
    PATH: `${runtimeBin}${path.delimiter}${process.env.PATH || ''}`,
  };
  appendLog(`Starting Harness in ${settings.workspace}`);
  const child = spawn(
    process.execPath,
    ['--expose-internals', dshBin, 'web', '--host', '127.0.0.1', '--port', '0'],
    {
      cwd: settings.workspace,
      env: environment,
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true,
    },
  );
  backend = child;

  return new Promise((resolve, reject) => {
    let settled = false;
    let stdoutBuffer = '';
    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      reject(new Error('Harness 引擎未在 45 秒内报告监听地址。'));
    }, 45000);

    const fail = (error) => {
      appendLog(error.stack || error.message || String(error));
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      reject(error);
    };

    child.stdout.on('data', (chunk) => {
      const value = chunk.toString();
      appendLog(`[engine] ${value}`);
      stdoutBuffer += value;
      const match = stdoutBuffer.match(/dsh web:\s+(http:\/\/127\.0\.0\.1:\d+)/);
      if (!match || settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(match[1]);
    });
    child.stderr.on('data', (chunk) => appendLog(`[engine:error] ${chunk.toString()}`));
    child.once('error', fail);
    child.once('exit', (code, signal) => {
      appendLog(`Harness exited (code=${code}, signal=${signal || 'none'}).`);
      if (!settled) fail(new Error(`Harness 引擎意外退出（代码 ${code ?? 'unknown'}）。`));
      if (!quitting && !stoppingBackend && backend === child) {
        void showEngineError(new Error('Harness 引擎已经停止。'));
      }
    });
  });
}

async function stopBackend() {
  const child = backend;
  backend = null;
  backendUrl = null;
  if (!child || child.killed) return;
  stoppingBackend = true;
  try {
    child.kill();
    await new Promise((resolve) => {
      const timer = setTimeout(resolve, 2500);
      child.once('exit', () => {
        clearTimeout(timer);
        resolve();
      });
    });
    if (child.exitCode === null) child.kill('SIGKILL');
  } finally {
    stoppingBackend = false;
  }
}

async function showEngineError(error) {
  appendLog(error.stack || error.message || String(error));
  if (isSmokeTest || !mainWindow || mainWindow.isDestroyed()) return;
  await mainWindow.loadFile(path.join(__dirname, 'error.html'), {
    query: { message: error.message || String(error) },
  });
}

async function restartBackend() {
  if (mainWindow && !mainWindow.isDestroyed()) {
    await mainWindow.loadFile(path.join(__dirname, 'splash.html'));
  }
  await stopBackend();
  try {
    const url = await startBackend();
    backendUrl = url;
    await waitForHttp(url);
    appendLog(`Harness ready at ${url}`);
    if (isSmokeTest) return url;
    if (mainWindow && !mainWindow.isDestroyed()) await mainWindow.loadURL(url);
    return url;
  } catch (error) {
    await showEngineError(error);
    throw error;
  }
}

async function chooseWorkspace() {
  if (!mainWindow) return;
  const current = loadDesktopSettings().workspace;
  const result = await dialog.showOpenDialog(mainWindow, {
    title: '选择 Harness 工作区',
    defaultPath: current,
    properties: ['openDirectory', 'createDirectory'],
  });
  if (result.canceled || result.filePaths.length === 0) return;
  saveDesktopSettings({ workspace: result.filePaths[0] });
  buildApplicationMenu();
  await restartBackend().catch(() => {});
}

function buildApplicationMenu() {
  const settings = loadDesktopSettings();
  const template = [
    {
      label: '应用',
      submenu: [
        {
          label: '重新启动 Harness 引擎',
          accelerator: 'CmdOrCtrl+Shift+R',
          click: () => void restartBackend().catch(() => {}),
        },
        { type: 'separator' },
        { label: '选择工作区…', click: () => void chooseWorkspace() },
        { label: '打开当前工作区', click: () => void shell.openPath(settings.workspace) },
        { label: '打开 Harness 数据目录', click: () => void shell.openPath(resolveDshHome()) },
        { type: 'separator' },
        { role: 'quit', label: '退出 Harness Orbit' },
      ],
    },
    {
      label: '编辑',
      submenu: [
        { role: 'undo', label: '撤销' },
        { role: 'redo', label: '重做' },
        { type: 'separator' },
        { role: 'cut', label: '剪切' },
        { role: 'copy', label: '复制' },
        { role: 'paste', label: '粘贴' },
        { role: 'selectAll', label: '全选' },
      ],
    },
    {
      label: '视图',
      submenu: [
        { role: 'reload', label: '刷新界面' },
        { role: 'forceReload', label: '强制刷新' },
        { type: 'separator' },
        { role: 'resetZoom', label: '实际大小' },
        { role: 'zoomIn', label: '放大' },
        { role: 'zoomOut', label: '缩小' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: '切换全屏' },
        { role: 'toggleDevTools', label: '开发者工具' },
      ],
    },
    {
      label: '插件',
      submenu: [
        { label: '浏览 DSH 插件市场', click: () => void shell.openExternal(MARKET_URL) },
        {
          label: '打开已安装插件目录',
          click: () => void shell.openPath(path.join(resolveDshHome(), 'profiles', 'web', 'node_modules')),
        },
      ],
    },
    {
      label: '帮助',
      submenu: [
        { label: '打开运行日志', click: () => void shell.openPath(logFile) },
        { type: 'separator' },
        {
          label: `关于 ${PRODUCT_NAME}`,
          click: () => dialog.showMessageBox(mainWindow, {
            type: 'info',
            title: `关于 ${PRODUCT_NAME}`,
            message: `${PRODUCT_NAME} ${app.getVersion()}`,
            detail: 'DeepSeek Harness 桌面运行时 · Orbit 插件优先界面\n内置 Chromium、Harness 引擎与 pnpm 插件安装器。',
          }),
        },
      ],
    },
  ];
  if (process.platform === 'darwin') {
    template.unshift({
      label: PRODUCT_NAME,
      submenu: [
        { role: 'about', label: `关于 ${PRODUCT_NAME}` },
        { type: 'separator' },
        { role: 'services', label: '服务' },
        { type: 'separator' },
        { role: 'hide', label: `隐藏 ${PRODUCT_NAME}` },
        { role: 'hideOthers', label: '隐藏其他' },
        { role: 'unhide', label: '全部显示' },
        { type: 'separator' },
        { role: 'quit', label: `退出 ${PRODUCT_NAME}` },
      ],
    });
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

function registerIpc() {
  ipcMain.handle('orbit:app-info', () => ({
    version: app.getVersion(),
    workspace: loadDesktopSettings().workspace,
  }));
  ipcMain.handle('orbit:restart-engine', async () => {
    await restartBackend();
    return true;
  });
  ipcMain.handle('orbit:open-logs', () => shell.openPath(logFile));
  ipcMain.handle('orbit:choose-workspace', chooseWorkspace);
}

async function runSmokeTest() {
  const originalDshHome = process.env.DSH_HOME;
  const smokeHome = path.join(app.getPath('temp'), 'harness-orbit-smoke', String(process.pid));
  process.env.DSH_HOME = smokeHome;
  try {
    const url = await restartBackend();
    process.stdout.write(`HARNESS_ORBIT_SMOKE_OK ${url}${os.EOL}`);
    await stopBackend();
    fs.rmSync(smokeHome, { recursive: true, force: true });
    app.exit(0);
  } catch (error) {
    process.stderr.write(`HARNESS_ORBIT_SMOKE_FAILED ${error.stack || error}${os.EOL}`);
    await stopBackend();
    fs.rmSync(smokeHome, { recursive: true, force: true });
    app.exit(1);
  } finally {
    if (originalDshHome === undefined) delete process.env.DSH_HOME;
    else process.env.DSH_HOME = originalDshHome;
  }
}

if (singleInstance) {
  app.on('second-instance', () => {
    if (!mainWindow) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  });

  app.on('before-quit', () => {
    quitting = true;
    if (backend && !backend.killed) backend.kill();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', () => {
    if (mainWindow) return;
    mainWindow = createMainWindow();
    if (backendUrl) void mainWindow.loadURL(backendUrl);
    else void restartBackend().catch(() => {});
  });

  app.whenReady().then(async () => {
    logFile = path.join(app.getPath('userData'), 'logs', 'harness-engine.log');
    configureSessionSecurity();
    registerIpc();
    buildApplicationMenu();
    if (isSmokeTest) {
      await runSmokeTest();
      return;
    }
    mainWindow = createMainWindow();
    await restartBackend().catch(() => {});
  });
}

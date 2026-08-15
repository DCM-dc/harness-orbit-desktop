const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('harnessOrbit', Object.freeze({
  appInfo: () => ipcRenderer.invoke('orbit:app-info'),
  restartEngine: () => ipcRenderer.invoke('orbit:restart-engine'),
  openLogs: () => ipcRenderer.invoke('orbit:open-logs'),
  chooseWorkspace: () => ipcRenderer.invoke('orbit:choose-workspace'),
}));

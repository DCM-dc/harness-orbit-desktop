const params = new URLSearchParams(window.location.search);
const message = params.get('message');
if (message) document.querySelector('#message').textContent = message;

document.querySelector('#retry').addEventListener('click', async (event) => {
  const button = event.currentTarget;
  button.disabled = true;
  button.textContent = '正在启动…';
  try {
    await window.harnessOrbit.restartEngine();
  } catch {
    button.disabled = false;
    button.textContent = '重新启动';
  }
});
document.querySelector('#workspace').addEventListener('click', () => window.harnessOrbit.chooseWorkspace());
document.querySelector('#logs').addEventListener('click', () => window.harnessOrbit.openLogs());

window.harnessOrbit?.appInfo().then(({ version, workspace }) => {
  const meta = document.querySelector('#meta');
  if (meta) meta.textContent = `v${version} · ${workspace}`;
}).catch(() => {});

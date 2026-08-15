const path = require('node:path');
const sharp = require('sharp');

const root = path.join(__dirname, '..');
sharp(path.join(root, 'src', 'assets', 'orbit-mark.svg'))
  .resize(512, 512)
  .png()
  .toFile(path.join(root, 'build', 'icon.png'))
  .then(() => process.stdout.write('Generated build/icon.png\n'))
  .catch((error) => {
    process.stderr.write(`${error.stack || error}\n`);
    process.exitCode = 1;
  });

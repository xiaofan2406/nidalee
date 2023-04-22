import {copyFile} from 'fs/promises';
import {resolve} from 'path';
import {fileURLToPath} from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// async function renameBundleCss() {
//   const oldName = path.resolve(__dirname, '../dist/style.css');
//   const newName = path.resolve(__dirname, '../dist/nidalee.css');

//   await fs.rename(oldName, newName);
//   console.log('Rename bundled css done.');
// }

async function copyThemeCss() {
  const source = resolve(__dirname, '../src/theme.css');
  const dest = resolve(__dirname, '../dist/theme.css');
  await copyFile(source, dest);
  console.log('Copy theme css done.');
}

async function copyResetCss() {
  const source = resolve(__dirname, '../src/reset.css');
  const dest = resolve(__dirname, '../dist/reset.css');
  await copyFile(source, dest);
  console.log('Copy reset css done.');
}

async function main() {
  try {
    await Promise.all([
      /* renameBundleCss(), */ copyThemeCss(),
      copyResetCss(),
    ]);
  } catch (error) {
    console.error('Post build script failed', error);
    process.exit(1);
  }
}

main();

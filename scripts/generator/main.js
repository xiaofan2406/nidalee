const path = require('path');
const {readFile, writeFile, appendFile, mkdir} = require('fs/promises');

const pagePath = path.join(__dirname, '../../packages/docs/pages');
const srcPath = path.join(__dirname, '../../packages/nidalee/src');

async function main(...args) {
  if (args.length < 3) {
    console.error('Require a component name');
    process.exit(1);
  }
  let [, , [start, ...name]] = args;

  const componentName = [start.toUpperCase(), ...name].join('');

  const replaceAll = (data) => {
    return data
      .toString()
      .replace(new RegExp('__Name__', 'g'), componentName)
      .replace(new RegExp('__name__', 'g'), componentName.toLowerCase());
  };

  await mkdir(path.join(srcPath, componentName));

  await Promise.all(
    [
      [
        path.join(pagePath, `/${componentName}.page.tsx`),
        path.join(__dirname, './page-template'),
      ],
      [
        path.join(srcPath, `/${componentName}/${componentName}.css`),
        path.join(__dirname, './css-template'),
      ],
      [
        path.join(srcPath, `/${componentName}/${componentName}.tsx`),
        path.join(__dirname, './src-template'),
      ],
      [
        path.join(srcPath, `/${componentName}/${componentName}.spec.tsx`),
        path.join(__dirname, './test-template'),
      ],
      [
        path.join(srcPath, `/${componentName}/index.ts`),
        path.join(__dirname, './index-template'),
      ],
      [path.join(srcPath, `/index.ts`)],
    ].map(async ([filePath, templatePath]) => {
      if (!templatePath) {
        // src index
        return appendFile(filePath, `export * from './${componentName}';\n`);
      }
      const fileContent = replaceAll(await readFile(templatePath));

      return writeFile(filePath, fileContent);
    })
  );
}

main(...process.argv);

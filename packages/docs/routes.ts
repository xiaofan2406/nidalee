interface _PageFile {
  default: () => JSX.Element;
  info: {title?: string; category?: string; path?: string};
}

interface PageFile {
  default: () => JSX.Element;
  info: {title: string; category: string; path: string};
}

const pagesFiles = import.meta.glob('./**/*.page.tsx', {eager: true}) as {
  [key: string]: _PageFile;
};
export const pages = Object.keys(pagesFiles).reduce((reduced, next) => {
  const nextPage = pagesFiles[next];
  const category = nextPage.info.category || '_root';
  const files = reduced[category] || [];

  const title =
    nextPage.info.title ||
    (() => {
      const parts = next.split('/');
      return parts[parts.length - 1].replace('.page.tsx', '');
    })();

  const path =
    nextPage.info.path ||
    (category === '_root'
      ? `${title.toLowerCase()}`
      : `${category.toLowerCase()}/${title.toLowerCase()}`);

  return {
    ...reduced,
    [category]: [
      ...files,
      {...nextPage, info: {...nextPage.info, category, title, path}},
    ],
  };
}, {} as {[key: string]: PageFile[]});

export const order = ['_root', 'components'];

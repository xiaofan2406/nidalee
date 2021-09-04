export const warn = (shouldLogError: boolean, name: string, ...args: any[]) => {
  if (shouldLogError) {
    console.error(`[${name}]:`, ...args);
  }
};

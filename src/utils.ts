export const warn = (condition: boolean, name: string, ...args: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
    if (condition) {
      const message = `[Nidalee][${name}]:`;
      console.error(message, ...args);
    }
  }
};

export function warn(shouldLogError: boolean, name: string, ...args: any[]) {
  if (shouldLogError) {
    console.error(`[${name}]:`, ...args);
  }
}

export function cx(...items: (string | boolean | undefined | null)[]) {
  return items.filter(Boolean).join(' ');
}

export function cbx<T extends React.SyntheticEvent<HTMLElement, Event>>(
  ...funcs: (((event: T) => void) | undefined)[]
) {
  return (event: T) => {
    for (const func of funcs) {
      if (func) {
        func(event);
      }
    }
  };
}

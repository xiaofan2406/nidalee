export function warn(shouldLogError: boolean, name: string, ...args: any[]) {
  if (shouldLogError) {
    console.error(`[${name}]:`, ...args);
  }
}

export function cx(...items: (string | boolean | undefined | null)[]) {
  return items.filter(Boolean).join(' ');
}

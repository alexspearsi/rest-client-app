export function cloneItWithoutKeys<T>(object: T, keys: Array<keyof T>): T {
  const clone: T = structuredClone(object);

  for (const key of keys) {
    delete clone[key];
  }

  return clone;
}

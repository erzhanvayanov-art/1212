export function cache<T extends (...args: any[]) => any>(fn: T): T {
  const cacheMap = new Map<string, any>();

  return function (this: any, ...args: any[]) {
    const key = JSON.stringify(args);

    if (cacheMap.has(key)) {
      return cacheMap.get(key);
    }

    const result = fn.apply(this, args);
    cacheMap.set(key, result);
    return result;
  } as T;
}
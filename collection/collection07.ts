export function countFrequency(arr: string[]): Map<string, number> {
  const map = new Map<string, number>();

  for (const item of arr) {
    if (map.has(item)) {
      map.set(item, map.get(item)! + 1);
    } else {
      map.set(item, 1);
    }
  }

  return map;
}
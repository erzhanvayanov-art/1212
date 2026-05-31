export function findIntersection(arr1: number[], arr2: number[]): number[] {
  const set1 = new Set(arr1);
  const intersection = new Set<number>();

  for (const item of arr2) {
    if (set1.has(item)) {
      intersection.add(item);
    }
  }

  return [...intersection];
}
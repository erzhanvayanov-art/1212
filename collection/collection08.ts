export function unionSets<T>(set1: Set<T>, set2: Set<T>): Set<T> {
	return new Set([...set1, ...set2]);
}
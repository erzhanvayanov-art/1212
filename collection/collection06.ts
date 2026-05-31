export function getUnique(arr: number[]): number[] {
	return [...new Set(arr)];
}
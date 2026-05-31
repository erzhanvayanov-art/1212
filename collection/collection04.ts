export function* filterEven(arr: number[]): IterableIterator<number> {
	for (const num of arr) {
		if (num % 2 === 0) {
			yield num;
		}
	}
}
export type Result = { num: number, square: number, index: number };

export function squaresWithIndex(numbers: number[]): Result[] {
	return numbers.map((num, index) => ({
		num: num,
		square: num * num,
		index: index
	}));
}
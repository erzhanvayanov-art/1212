export function addPrefix(arr: string[]): string[] {
	return arr.map(item => `Item: ${item}`);
}

const empty = [];
console.log(addPrefix(empty)); // []
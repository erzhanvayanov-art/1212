export function* infiniteSequence(): IterableIterator<number> {
	let i = 0;
	while (true) {
		yield i;
		i++;
	}
}
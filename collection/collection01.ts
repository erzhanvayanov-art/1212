export function* numberGenerator(max: number) {
	for (let i = 1; i <= max; i++) {
		yield i;  // возвращаем каждое число от 1 до max
	}
}
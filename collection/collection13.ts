export function countByRanges(numbers: number[], ranges: [number, number][]): Map<string, number> {
	const result = new Map<string, number>();

	// Инициализируем Map с нулевыми значениями для каждого диапазона
	for (const range of ranges) {
		const key = `${range[0]}-${range[1]}`;
		result.set(key, 0);
	}

	// Подсчитываем числа в диапазонах
	for (const num of numbers) {
		for (const range of ranges) {
			const [start, end] = range;
			if (num >= start && num <= end) {
				const key = `${start}-${end}`;
				result.set(key, (result.get(key) || 0) + 1);
				// НЕ используем break - число должно быть подсчитано во всех диапазонах, 
				// в которые оно попадает
			}
		}
	}

	return result;
}
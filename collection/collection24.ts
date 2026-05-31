export function findMaxWithCondition<T>(
	array: T[],
	propertyName: keyof T,
	condition: (item: T) => boolean): T | null {

	const filtered = array.filter(condition);

	if (filtered.length === 0) {
		return null;
	}

	return filtered.reduce((max, current) => {
		const maxValue = max[propertyName] as unknown as number;
		const currentValue = current[propertyName] as unknown as number;
		return currentValue > maxValue ? current : max;
	});
}
export function groupByCategory<T extends Record<string, any>>(arr: T[], key: keyof T): Record<T[keyof T], T[]> {
	const result = {} as Record<T[keyof T], T[]>;

	for (const item of arr) {
		const keyValue = item[key];

		if (!result[keyValue]) {
			result[keyValue] = [];
		}

		result[keyValue].push(item);
	}

	return result;
}
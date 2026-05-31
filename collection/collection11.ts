export function groupBy<T extends Record<string, any>>(arr: T[], key: keyof T): Map<T[keyof T], T[]> {
	const map = new Map<T[keyof T], T[]>();

	for (const item of arr) {
		const keyValue = item[key];

		if (map.has(keyValue)) {
			map.get(keyValue)!.push(item);
		} else {
			map.set(keyValue, [item]);
		}
	}

	return map;
}
export function sumProperty<T>(objects: T[], property: keyof T): number {
	return objects.reduce((sum, obj) => {
		const value = obj[property];
		return sum + (typeof value === 'number' ? value : 0);
	}, 0);
}

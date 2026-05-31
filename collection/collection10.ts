export function invertMap<K, V>(map: Map<K, V>): Map<V, K> {
	const newMap = new Map<V, K>();

	for (const [key, value] of map) {
		newMap.set(value, key);
	}

	return newMap;
}
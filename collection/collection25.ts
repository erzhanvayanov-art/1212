type Order = { status: string, amount: number }
type Stats = { total: number, count: number, average: number }

export function getOrderStats(orders: Order[]): Stats {
	const completedOrders = orders.filter(order => order.status === 'completed');

	if (completedOrders.length === 0) {
		return { total: 0, count: 0, average: 0 };
	}

	const total = completedOrders.reduce((sum, order) => sum + order.amount, 0);
	const count = completedOrders.length;
	const average = total / count;

	return { total, count, average };
}
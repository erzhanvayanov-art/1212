import type { Db } from "mongodb"

export class Order {
	product: string
	quantity: number
	unitPrice: number
	discount: number
	constructor(product: string, quantity: number, unitPrice: number, discount: number) {
		this.product = product
		this.quantity = quantity
		this.unitPrice = unitPrice
		this.discount = discount
	}
}

export interface OrderTotal {
	product: string
	quantity: number
	unitPrice: number
	discount: number
	total: number
	finalTotal: number
}

export async function get_order_totals(db: Db): Promise<OrderTotal[]> {
	// Рассчитать итоговую сумму для каждого заказа с учетом скидки
	// Поля: product, total (quantity * unitPrice), finalTotal (total - discount)
	return await db.collection("orders").aggregate([
		{
			$addFields: {
				total: { $multiply: ["$quantity", "$unitPrice"] },
				finalTotal: {
					$subtract: [
						{ $multiply: ["$quantity", "$unitPrice"] },
						"$discount"
					]
				}
			}
		},
		{
			$project: {
				_id: 0,
				product: 1,
				quantity: 1,
				unitPrice: 1,
				discount: 1,
				total: 1,
				finalTotal: 1
			}
		}
	]).toArray() as OrderTotal[]
}
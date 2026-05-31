import type { Db } from "mongodb"

export class Customer {
	_id: string
	name: string
	joinDate: Date
	constructor(_id: string, name: string, joinDate: Date) {
		this._id = _id
		this.name = name
		this.joinDate = joinDate
	}
}

export class Order {
	customerId: string
	product: string
	amount: number
	date: Date
	status: string
	constructor(customerId: string, product: string, amount: number, date: Date, status: string) {
		this.customerId = customerId
		this.product = product
		this.amount = amount
		this.date = date
		this.status = status
	}
}

export interface CustomerAnalytics {
	_id: string
	customerName: string
	joinDate: Date
	totalSpent: number
	orderCount: number
	avgOrderValue: number
}

export async function get_customer_analytics(db: Db): Promise<CustomerAnalytics[]> {
	// Получить аналитику по клиентам: 
	// общая сумма заказов, количество заказов, средний чек
	return await db.collection("customers").aggregate([
		{
			$lookup: {
				from: "orders",
				localField: "_id",
				foreignField: "customerId",
				as: "customerOrders",
				pipeline: [
					{
						$match: {
							status: "completed" // Фильтруем только завершенные заказы
						}
					}
				]
			}
		},
		{
			$addFields: {
				totalSpent: { $sum: "$customerOrders.amount" },
				orderCount: { $size: "$customerOrders" },
				avgOrderValue: {
					$cond: {
						if: { $gt: [{ $size: "$customerOrders" }, 0] },
						then: { $avg: "$customerOrders.amount" },
						else: 0
					}
				}
			}
		},
		{
			$project: {
				_id: 1,
				customerName: "$name",
				joinDate: 1,
				totalSpent: 1,
				orderCount: 1,
				avgOrderValue: { $round: ["$avgOrderValue", 2] } // Округляем до 2 знаков
			}
		},
		{
			$sort: { totalSpent: -1 } // Сортируем по убыванию общей суммы
		}
	]).toArray() as CustomerAnalytics[]
}
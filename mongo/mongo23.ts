import type { Db } from "mongodb"

export class User {
    _id: string
    name: string
    email: string
    constructor(_id: string, name: string, email: string) {
        this._id = _id
        this.name = name
        this.email = email
    }
}

export class Order {
    userId: string
    product: string
    amount: number
    constructor(userId: string, product: string, amount: number) {
        this.userId = userId
        this.product = product
        this.amount = amount
    }
}

export interface OrderWithUser {
    _id: any
    userId: string
    product: string
    amount: number
    userInfo: Array<{
        name: string
        email: string
    }>
}

export async function get_orders_with_users(db: Db): Promise<OrderWithUser[]> {
    // Объединить заказы с информацией о пользователях
    return await db.collection("orders").aggregate([
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userInfo"
            }
        },
        {
            $project: {
                _id: 1,
                userId: 1,
                product: 1,
                amount: 1,
                userInfo: {
                    name: 1,
                    email: 1
                }
            }
        }
    ]).toArray() as OrderWithUser[]
}
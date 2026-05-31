import type { Db } from "mongodb"

export class Product {
    name: string
    price: number
    sales: number
    constructor(name: string, price: number, sales: number) {
        this.name = name
        this.price = price
        this.sales = sales
    }
}

export interface TopProduct {
    name: string
    sales: number
    price: number
}

export async function get_top_selling_products(db: Db, limit: number): Promise<TopProduct[]> {
    // Найти топ-N продуктов по количеству продаж
    return await db.collection("products").aggregate([
        {
            $sort: { sales: -1 }
        },
        {
            $limit: limit
        },
        {
            $project: {
                _id: 0,
                name: 1,
                sales: 1,
                price: 1
            }
        }
    ]).toArray() as TopProduct[]
}
import type { Db } from "mongodb"

export class Product {
    name: string
    price: number
    category: string
    rating: number
    constructor(name: string, price: number, category: string, rating: number) {
        this.name = name
        this.price = price
        this.category = category
        this.rating = rating
    }
}
export interface PriceBucket {
    _id: number | string // For boundaries and default
    count: number
    avgPrice: number
    products: string[]
}

export async function get_price_distribution(db: Db): Promise<PriceBucket[]> {
    // Сгруппировать продукты по ценовым диапазонам:
    // 0-50, 51-200, 201-500, 501-1000, 1001+
    // Использовать $bucket
    return await db.collection("products").aggregate([
        {
            $bucket: {
                groupBy: "$price",
                boundaries: [0, 51, 201, 501, 1001],
                default: "1001+",
                output: {
                    count: { $sum: 1 },
                    avgPrice: { $avg: "$price" },
                    products: { $push: "$name" }
                }
            }
        }
    ]).toArray() as PriceBucket[]
}
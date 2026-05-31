import type { Db } from "mongodb"

export class Sale {
    product: string
    amount: number
    region: string
    constructor(product: string, amount: number, region: string) {
        this.product = product
        this.amount = amount
        this.region = region
    }
}
export interface RegionSales {
    _id: string
    total: number
}

export async function get_total_sales_by_region(db: Db): Promise<RegionSales[]> {
    // Посчитать общую сумму продаж по каждому региону
    return await db.collection("sales").aggregate([
        {
            $group: {
                _id: "$region",
                total: { $sum: "$amount" }
            }
        },
        {
            $sort: { total: -1 } // Optional: sort by total sales descending
        }
    ]).toArray() as RegionSales[]
}
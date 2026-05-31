import type { Db } from "mongodb"

export class Product {
    name: string
    category: string
    price: number
    constructor(name: string, category: string, price: number) {
        this.name = name
        this.category = category
        this.price = price
    }
}

export async function remove_products_by_category(db: Db, category: string) {
    // Удалить все продукты указанной категории
    await db.collection("products").deleteMany({ category: category });
}
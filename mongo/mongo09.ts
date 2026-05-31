import type { Db } from "mongodb"

export class Car {
    brand: string
    model: string
    year: number
    price: number
    constructor(brand: string, model: string, year: number, price: number) {
        this.brand = brand
        this.model = model
        this.year = year
        this.price = price
    }
}

export async function find_cars_in_range(db: Db, minYear: number, maxPrice: number): Promise<Car[]> {
    // Найти автомобили с годом выпуска >= minYear и ценой <= maxPrice
    const carsData = await db.collection("cars")
        .find({
            year: { $gte: minYear },
            price: { $lte: maxPrice }
        })
        .toArray();

    return carsData.map(data => new Car(data.brand, data.model, data.year, data.price));
}
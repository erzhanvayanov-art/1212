import type { Db } from "mongodb"

export class Customer {
    name: string
    email: string
    phone?: string
    address?: string
    constructor(name: string, email: string, phone?: string, address?: string) {
        this.name = name
        this.email = email
        this.phone = phone
        this.address = address
    }
}

export async function find_customers_with_phone(db: Db): Promise<Customer[]> {
    // Найти всех клиентов, у которых указан телефонный номер
    const customersData = await db.collection("customers")
        .find({ phone: { $exists: true, $ne: null } })
        .toArray();

    return customersData.map(data => new Customer(data.name, data.email, data.phone, data.address));
}
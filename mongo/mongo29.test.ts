import { describe, expect, it } from "vitest";
import { get_customer_analytics, Customer, Order } from "./mongo29";
import { client, getDbName } from "./mongo_init";

describe('customer analytics test', () => {
    it('should get customer analytics with multiple collections', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("customers").insertMany([
                    new Customer("cust1", "Alice", new Date("2023-01-01")),
                    new Customer("cust2", "Bob", new Date("2023-02-01"))
                ])
                
                await db.collection("orders").insertMany([
                    new Order("cust1", "Laptop", 1000, new Date(), "completed"),
                    new Order("cust1", "Mouse", 50, new Date(), "completed"),
                    new Order("cust2", "Keyboard", 80, new Date(), "completed"),
                    new Order("cust2", "Monitor", 300, new Date(), "completed"),
                    new Order("cust2", "Headphones", 100, new Date(), "completed")
                ])
                
                result = await get_customer_analytics(db)
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        expect(result.length).toBe(2)
        const alice = result.find(c => c.customerName === "Alice")
        const bob = result.find(c => c.customerName === "Bob")
        expect(alice?.totalSpent).toBe(1050)
        expect(alice?.orderCount).toBe(2)
        expect(alice?.avgOrderValue).toBe(525)
        expect(bob?.totalSpent).toBe(480)
        expect(bob?.orderCount).toBe(3)
    });
});
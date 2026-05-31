import { describe, expect, it } from "vitest";
import { get_repeat_customers, Customer, Purchase } from "./mongo30";
import { client, getDbName } from "./mongo_init";

describe('repeat customers analysis test', () => {
    it('should identify repeat customers and their spending', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("customers").insertMany([
                    new Customer("cust1", "Alice", "alice@email.com"),
                    new Customer("cust2", "Bob", "bob@email.com"),
                    new Customer("cust3", "Charlie", "charlie@email.com")
                ])
                
                await db.collection("purchases").insertMany([
                    new Purchase("cust1", 100, new Date("2024-01-01")),
                    new Purchase("cust1", 200, new Date("2024-02-01")),
                    new Purchase("cust1", 150, new Date("2024-03-01")),
                    new Purchase("cust2", 300, new Date("2024-01-15")),
                    new Purchase("cust3", 50, new Date("2024-01-20")),
                    new Purchase("cust3", 75, new Date("2024-02-10"))
                ])
                
                result = await get_repeat_customers(db)
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }

        expect(result.length).toBe(3)
        
        const alice = result.find(c => c.customerName === "Alice")
        const bob = result.find(c => c.customerName === "Bob")
        const charlie = result.find(c => c.customerName === "Charlie")
        
        expect(alice?.purchaseCount).toBe(3)
        expect(alice?.totalSpent).toBe(450)
        expect(alice?.isRepeatCustomer).toBe(true)
        
        expect(bob?.purchaseCount).toBe(1)
        expect(bob?.totalSpent).toBe(300)
        expect(bob?.isRepeatCustomer).toBe(false)
        
        expect(charlie?.purchaseCount).toBe(2)
        expect(charlie?.totalSpent).toBe(125)
        expect(charlie?.isRepeatCustomer).toBe(true)
        
        // Проверяем сортировку по убыванию общей суммы
        expect(result[0].totalSpent).toBeGreaterThanOrEqual(result[1].totalSpent)
        expect(result[1].totalSpent).toBeGreaterThanOrEqual(result[2].totalSpent)
    });
});
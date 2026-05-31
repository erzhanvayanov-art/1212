import { describe, expect, it } from "vitest";
import { get_customer_categories, Customer } from "./mongo21";
import { client, getDbName } from "./mongo_init";

describe('customer categories test', () => {
    it('should categorize customers using $cond', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("customers").insertMany([
                    new Customer("Alice", 1500, "standard"),
                    new Customer("Bob", 800, "standard"),
                    new Customer("Charlie", 200, "premium"),
                    new Customer("Diana", 50, "standard")
                ])
                
                result = await get_customer_categories(db)
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        const alice = result.find(c => c.name === "Alice")
        const bob = result.find(c => c.name === "Bob")
        const charlie = result.find(c => c.name === "Charlie")
        const diana = result.find(c => c.name === "Diana")
        
        expect(alice?.category).toBe("VIP")
        expect(bob?.category).toBe("Regular")
        expect(charlie?.category).toBe("VIP")
        expect(diana?.category).toBe("New")
    });
});
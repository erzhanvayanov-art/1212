import { describe, expect, it } from "vitest";
import { find_customers_with_phone, Customer } from "./mongo15";
import { client, getDbName } from "./mongo_init";

describe('find customers with phone test', () => {
    it('should find customers with phone number using $exists', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("customers").insertMany([
                    new Customer("Alice", "alice@example.com", "+1234567890", "123 Main St"),
                    new Customer("Bob", "bob@example.com", undefined, "456 Oak Ave"),
                    new Customer("Charlie", "charlie@example.com", "+0987654321", "789 Pine Rd"),
                    new Customer("Diana", "diana@example.com")
                ])
                
                result = await find_customers_with_phone(db)
                console.log(result)
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        expect(result.length).toBe(2)
        expect(result.some(c => c.name === "Alice")).toBe(true)
        expect(result.some(c => c.name === "Charlie")).toBe(true)
        expect(result.some(c => c.name === "Bob")).toBe(false)
        expect(result.some(c => c.name === "Diana")).toBe(false)
    });
});
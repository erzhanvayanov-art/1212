import { describe, expect, it } from "vitest";
import { get_price_distribution, Product } from "./mongo27";
import { client, getDbName } from "./mongo_init";

describe('price distribution test', () => {
    it('should group products by price ranges using $bucket', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("products").insertMany([
                    new Product("Mouse", 25, "Electronics", 4.5),
                    new Product("Keyboard", 80, "Electronics", 4.2),
                    new Product("Monitor", 300, "Electronics", 4.8),
                    new Product("Laptop", 1200, "Electronics", 4.7),
                    new Product("Tablet", 450, "Electronics", 4.3),
                    new Product("Phone", 800, "Electronics", 4.6)
                ])
                
                result = await get_price_distribution(db)
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        expect(result.length).toBe(5)
        const lowRange = result.find(b => b._id === 0 )
        const highRange = result.find(b => b._id === "1001+")
        expect(lowRange?.count).toBe(1)
        expect(highRange?.count).toBe(1)
    });
});
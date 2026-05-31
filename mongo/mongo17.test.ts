import { describe, expect, it } from "vitest";
import { get_top_selling_products, Product } from "./mongo17";
import { client, getDbName } from "./mongo_init";

describe('top selling products test', () => {
    it('should find top selling products using aggregation', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("products").insertMany([
                    new Product("Laptop", 1000, 150),
                    new Product("Mouse", 50, 300),
                    new Product("Keyboard", 80, 200),
                    new Product("Monitor", 300, 100),
                    new Product("Headphones", 100, 250)
                ])
                
                result = await get_top_selling_products(db, 3)
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        expect(result.length).toBe(3)
        expect(result[0].name).toBe("Mouse")
        expect(result[0].sales).toBe(300)
        expect(result[1].name).toBe("Headphones")
        expect(result[2].name).toBe("Keyboard")
    });
});
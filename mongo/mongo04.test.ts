import { describe, expect, it } from "vitest";
import { remove_products_by_category, Product } from "./mongo04";
import { client, getDbName } from "./mongo_init";

describe('remove products by category test', () => {
    it('should remove products by category', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("products").insertMany([
                    new Product("Laptop", "Electronics", 1000),
                    new Product("Book", "Education", 20),
                    new Product("Phone", "Electronics", 500)
                ])
                
                await remove_products_by_category(db, "Electronics")
                result = await db.collection("products").find({}).toArray()
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        expect(result.length).toBe(1)
        expect(result[0].category).toBe("Education")
    });
});
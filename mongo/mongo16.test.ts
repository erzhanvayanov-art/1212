import { describe, expect, it } from "vitest";
import { get_total_sales_by_region, Sale } from "./mongo16";
import { client, getDbName } from "./mongo_init";

describe('total sales by region test', () => {
    it('should calculate total sales by region using aggregation', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("sales").insertMany([
                    new Sale("Laptop", 1000, "North"),
                    new Sale("Mouse", 50, "North"),
                    new Sale("Keyboard", 80, "South"),
                    new Sale("Monitor", 300, "South"),
                    new Sale("Laptop", 1200, "South")
                ])
                
                result = await get_total_sales_by_region(db)
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        expect(result.length).toBe(2)
        const north = result.find(r => r._id === "North")
        const south = result.find(r => r._id === "South")
        expect(north?.total).toBe(1050)
        expect(south?.total).toBe(1580)
    });
});
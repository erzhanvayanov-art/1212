import { describe, expect, it } from "vitest";
import { get_order_totals, Order } from "./mongo19";
import { client, getDbName } from "./mongo_init";

describe('order totals calculation test', () => {
    it('should calculate order totals with discount using $project', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("orders").insertMany([
                    new Order("Laptop", 2, 1000, 100),
                    new Order("Mouse", 5, 50, 25),
                    new Order("Keyboard", 3, 80, 0)
                ])
                
                result = await get_order_totals(db)
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        expect(result.length).toBe(3)
        const laptopOrder = result.find(o => o.product === "Laptop")
        expect(laptopOrder.total).toBe(2000)
        expect(laptopOrder.finalTotal).toBe(1900)
    });
});
import { describe, expect, it } from "vitest";
import { update_order_status, Order } from "./mongo06";
import { client, getDbName } from "./mongo_init";

describe('update multiple orders test', () => {
    it('should update status of multiple orders', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("orders").insertMany([
                    new Order("Laptop", 1, "pending"),
                    new Order("Mouse", 2, "pending"),
                    new Order("Keyboard", 1, "shipped")
                ])
                
                await update_order_status(db, "pending", "processing")
                result = await db.collection("orders").find({}).toArray()
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        const pendingOrders = result.filter(o => o.status === "pending")
        const processingOrders = result.filter(o => o.status === "processing")
        expect(pendingOrders.length).toBe(0)
        expect(processingOrders.length).toBe(2)
    });
});
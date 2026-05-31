import { describe, expect, it } from "vitest";
import { get_orders_with_users, User, Order } from "./mongo23";
import { client, getDbName } from "./mongo_init";

describe('orders with users test', () => {
    it('should join orders with users using $lookup', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("users").insertMany([
                    new User("user1", "Alice", "alice@example.com"),
                    new User("user2", "Bob", "bob@example.com")
                ])
                
                await db.collection("orders").insertMany([
                    new Order("user1", "Laptop", 1000),
                    new Order("user1", "Mouse", 50),
                    new Order("user2", "Keyboard", 80)
                ])
                
                result = await get_orders_with_users(db)
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        expect(result.length).toBe(3)
        const aliceOrders = result.filter(o => o.userInfo[0].name === "Alice")
        expect(aliceOrders.length).toBe(2)
        expect(result[0].userInfo[0].email).toBeDefined()
    });
});
import { describe, expect, it } from "vitest";
import { get_transaction_analytics, Transaction } from "./mongo22";
import { client, getDbName } from "./mongo_init";

describe('transaction analytics test', () => {
    it('should get multi-faceted analytics using $facet', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("transactions").insertMany([
                    new Transaction("income", 1000, "salary", new Date()),
                    new Transaction("expense", 200, "food", new Date()),
                    new Transaction("expense", 150, "transport", new Date()),
                    new Transaction("income", 500, "freelance", new Date()),
                    new Transaction("expense", 300, "food", new Date())
                ])
                
                result = await get_transaction_analytics(db)
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        expect(result.totals.length).toBe(2)
        expect(result.byCategory.length).toBe(4)
        expect(result.byType.length).toBe(2)
        
        const incomeTotal = result.totals.find(t => t._id === "income")
        expect(incomeTotal?.totalAmount).toBe(1500)
    });
});
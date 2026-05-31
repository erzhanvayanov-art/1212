import { describe, expect, it } from "vitest";
import { get_management_chain, Employee } from "./mongo26";
import { client, getDbName } from "./mongo_init";

describe('management chain test', () => {
    it('should find management chain using $graphLookup', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("employees").insertMany([
                    new Employee("ceo", "John CEO", "CEO"),
                    new Employee("vp1", "Jane VP", "VP", "ceo"),
                    new Employee("mgr1", "Bob Manager", "Manager", "vp1"),
                    new Employee("dev1", "Alice Developer", "Developer", "mgr1")
                ])
                
                result = await get_management_chain(db, "dev1")
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        expect(result.length).toBe(3) // Все менеджеры выше Alice
        expect(result.some(e => e.name === "Bob Manager")).toBe(true)
        expect(result.some(e => e.name === "Jane VP")).toBe(true)
        expect(result.some(e => e.name === "John CEO")).toBe(true)
    });
});
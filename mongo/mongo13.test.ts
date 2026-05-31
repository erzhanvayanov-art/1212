import { describe, expect, it } from "vitest";
import { add_role_to_user, User } from "./mongo13";
import { client, getDbName } from "./mongo_init";

describe('add role to user test', () => {
    it('should add role to user using $push', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("users").insertMany([
                    new User("john_doe", "john@example.com", ["user", "editor"]),
                    new User("jane_smith", "jane@example.com", ["user"])
                ])
                
                await add_role_to_user(db, "john_doe", "admin")
                result = await db.collection("users").find({}).toArray()
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        const john = result.find(u => u.username === "john_doe")
        const jane = result.find(u => u.username === "jane_smith")
        
        expect(john?.roles.length).toBe(3)
        expect(john?.roles).toContain("user")
        expect(john?.roles).toContain("editor")
        expect(john?.roles).toContain("admin")
        expect(jane?.roles.length).toBe(1) // Не должен измениться
    });
});
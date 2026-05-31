import { describe, expect, it } from "vitest";
import { add_user, run, User } from "./mongo_init";

describe('user creation test', () => {
    it('user creation test', () => {
        run(
            async (db) => {
                await add_user(db, new User("test", 10))
                const users = await db.collection("users").find({}).toArray()
                expect(users.length).toBe(1)
                expect(users[0].name).toBe("test")
                expect(users[0].age).toBe(10)
            }
        ).catch(console.dir)
    });
});
import { describe, expect, it } from "vitest";
import { complete_task, Task } from "./mongo03";
import { client, getDbName } from "./mongo_init";

describe('complete task test', () => {
    it('should mark task as completed', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("tasks").insertMany([
                    new Task("Learn MongoDB", false, 1),
                    new Task("Write tests", false, 2)
                ])
                
                await complete_task(db, "Learn MongoDB")
                result = await db.collection("tasks").find({}).toArray()
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        const completedTask = result.find(t => t.description === "Learn MongoDB")
        expect(completedTask?.completed).toBe(true)
    });
});
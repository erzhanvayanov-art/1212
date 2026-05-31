import { describe, expect, it } from "vitest";
import { find_students_by_grade, Student } from "./mongo02";
import { client, getDbName } from "./mongo_init";

describe('find students by grade test', () => {
    it('should find students by grade', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("students").insertMany([
                    new Student("Alice", "10A", 4.5),
                    new Student("Bob", "10A", 4.2),
                    new Student("Charlie", "11B", 4.8)
                ])
                
                result = await find_students_by_grade(db, "10A")
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        expect(result.length).toBe(2)
        expect(result[0].name).toBe("Alice")
        expect(result[1].name).toBe("Bob")
    });
});
import { describe, expect, it } from "vitest";
import { find_courses_in_departments, Course } from "./mongo11";
import { client, getDbName } from "./mongo_init";

describe('find courses in departments test', () => {
    it('should find courses in specified departments using $in', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("courses").insertMany([
                    new Course("Math 101", "Mathematics", 3),
                    new Course("Physics 101", "Physics", 4),
                    new Course("CS 101", "Computer Science", 3),
                    new Course("Biology 101", "Biology", 4),
                    new Course("Chemistry 101", "Chemistry", 4)
                ])
                
                result = await find_courses_in_departments(db, ["Mathematics", "Physics", "Computer Science"])
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        expect(result.length).toBe(3)
        expect(result.some(c => c.department === "Mathematics")).toBe(true)
        expect(result.some(c => c.department === "Physics")).toBe(true)
        expect(result.some(c => c.department === "Computer Science")).toBe(true)
        expect(result.some(c => c.department === "Biology")).toBe(false)
    });
});
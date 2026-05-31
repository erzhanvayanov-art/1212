import { describe, expect, it } from "vitest";
import { find_high_salary_employees, Employee } from "./mongo05";
import { client, getDbName } from "./mongo_init";

describe('find high salary employees test', () => {
    it('should find employees with salary greater than min', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("employees").insertMany([
                    new Employee("John", 50000, "IT"),
                    new Employee("Jane", 75000, "HR"),
                    new Employee("Bob", 45000, "IT")
                ])

                result = await find_high_salary_employees(db, 50000)
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        expect(result.length).toBe(1)
        expect(result[0].name).toBe("Jane")
        expect(result[0].salary).toBe(75000)
    });
});
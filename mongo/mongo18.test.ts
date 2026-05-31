import { describe, expect, it } from "vitest";
import { get_department_stats, Employee } from "./mongo18";
import { client, getDbName } from "./mongo_init";

describe('department stats test', () => {
    it('should calculate department statistics using aggregation', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("employees").insertMany([
                    new Employee("John", "IT", 60000, 3),
                    new Employee("Jane", "IT", 80000, 5),
                    new Employee("Bob", "HR", 50000, 2),
                    new Employee("Alice", "HR", 55000, 4),
                    new Employee("Charlie", "Finance", 70000, 6)
                ])                
                result = await get_department_stats(db)
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        expect(result.length).toBe(3)
        const itDept = result.find(d => d._id === "IT")
        expect(itDept?.avgSalary).toBe(70000)
        expect(itDept?.maxSalary).toBe(80000)
        expect(itDept?.employeeCount).toBe(2)
    });
});
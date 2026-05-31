import { describe, expect, it } from "vitest";
import { get_department_details, Department, Employee, Project } from "./mongo25";
import { client, getDbName } from "./mongo_init";

describe('department details test', () => {
    it('should get department details with employees and projects', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("departments").insertMany([
                    new Department("dept1", "Engineering", "John Manager"),
                    new Department("dept2", "Marketing", "Jane Director")
                ])
                
                await db.collection("employees").insertMany([
                    new Employee("emp1", "Alice", "dept1", "Developer", 80000),
                    new Employee("emp2", "Bob", "dept1", "Designer", 70000),
                    new Employee("emp3", "Charlie", "dept2", "Analyst", 60000)
                ])
                
                await db.collection("projects").insertMany([
                    new Project("Website Redesign", "dept1", 50000, "active"),
                    new Project("Mobile App", "dept1", 75000, "planning"),
                    new Project("Ad Campaign", "dept2", 30000, "completed")
                ])
                
                result = await get_department_details(db)
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        expect(result.length).toBe(2)
        const engineeringDept = result.find(d => d._id === "dept1")
        expect(engineeringDept.employees.length).toBe(2)
        expect(engineeringDept.projects.length).toBe(2)
        expect(engineeringDept.totalBudget).toBe(125000)
    });
});
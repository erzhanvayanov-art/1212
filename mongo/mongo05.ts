import type { Db } from "mongodb"

export class Employee {
    name: string
    salary: number
    department: string
    constructor(name: string, salary: number, department: string) {
        this.name = name
        this.salary = salary
        this.department = department
    }
}

export async function find_high_salary_employees(db: Db, minSalary: number): Promise<Employee[]> {
    // Найти всех сотрудников с зарплатой больше minSalary
    const employeesData = await db.collection("employees").find({ salary: { $gt: minSalary } }).toArray();
    return employeesData.map(data => new Employee(data.name, data.salary, data.department));
}
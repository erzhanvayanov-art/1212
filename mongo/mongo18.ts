import type { Db } from "mongodb"

export class Employee {
	name: string
	department: string
	salary: number
	experience: number
	constructor(name: string, department: string, salary: number, experience: number) {
		this.name = name
		this.department = department
		this.salary = salary
		this.experience = experience
	}
}


export interface DepartmentStats {
	_id: string
	avgSalary: number
	maxSalary: number
	employeeCount: number
}

export async function get_department_stats(db: Db): Promise<DepartmentStats[]> {
	// Получить статистику по отделам: средняя зарплата, максимальная зарплата, количество сотрудников
	return await db.collection("employees").aggregate([
		{
			$group: {
				_id: "$department",
				avgSalary: { $avg: "$salary" },
				maxSalary: { $max: "$salary" },
				employeeCount: { $sum: 1 }
			}
		},
		{
			$sort: { avgSalary: -1 } // Optional: sort by average salary descending
		}
	]).toArray() as DepartmentStats[]
}
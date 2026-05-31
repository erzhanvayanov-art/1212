import type { Db } from "mongodb"

export class Employee {
	_id: string
	name: string
	position: string
	managerId?: string
	constructor(_id: string, name: string, position: string, managerId?: string) {
		this._id = _id
		this.name = name
		this.position = position
		this.managerId = managerId
	}
}

export interface ManagementEmployee {
	_id: string
	name: string
	position: string
	level: number
}

export async function get_management_chain(db: Db, employeeId: string): Promise<ManagementEmployee[]> {
	// Найти всю цепочку управления для сотрудника (все менеджеры выше)
	// Используйте операцию $graphLookup
	return await db.collection("employees").aggregate([
		{
			$match: {
				_id: employeeId // Начинаем с указанного сотрудника
			}
		},
		{
			$graphLookup: {
				from: "employees",
				startWith: "$managerId",
				connectFromField: "managerId",
				connectToField: "_id",
				as: "managers",
				depthField: "level",
				maxDepth: 10 // Optional: limit recursion depth
			}
		},
		{
			$unwind: {
				path: "$managers",
				preserveNullAndEmptyArrays: false
			}
		},
		{
			$project: {
				_id: "$managers._id",
				name: "$managers.name",
				position: "$managers.position",
				level: { $add: ["$managers.level", 1] } // Level 1 = direct manager, 2 = manager's manager, etc.
			}
		},
		{
			$sort: { level: 1 } // Sort by level ascending (direct manager first)
		}
	]).toArray() as ManagementEmployee[]
}
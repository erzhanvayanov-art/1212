import type { Db } from "mongodb"

export class Project {
	name: string
	team: string[]
	status: string
	constructor(name: string, team: string[], status: string) {
		this.name = name
		this.team = team
		this.status = status
	}
}

export async function remove_member_from_project(db: Db, projectName: string, memberToRemove: string) {
	// Удалить указанного участника из команды проекта
	await db.collection("projects").updateOne(
		{ name: projectName },
		{ $pull: { team: memberToRemove } }
	);
}
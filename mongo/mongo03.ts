import type { Db } from "mongodb"

export class Task {
    description: string
    completed: boolean
    priority: number
    constructor(description: string, completed: boolean, priority: number) {
        this.description = description
        this.completed = completed
        this.priority = priority
    }
}

export async function complete_task(db: Db, taskDescription: string) {
    // Найти задачу по описанию и установить completed = true
    await db.collection("tasks").updateOne(
        { description: taskDescription },
        { $set: { completed: true } }
    );
}
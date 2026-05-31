import type { Db } from "mongodb"

export class User {
    username: string
    email: string
    roles: string[]
    constructor(username: string, email: string, roles: string[]) {
        this.username = username
        this.email = email
        this.roles = roles
    }
}

export async function add_role_to_user(db: Db, username: string, newRole: string) {
    // Добавить новую роль пользователю без замены существующих ролей
    await db.collection("users").updateOne(
        { username: username },
        { $addToSet: { roles: newRole } }
    );
}
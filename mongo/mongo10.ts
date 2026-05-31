import type { Db } from "mongodb"

export class Player {
    name: string
    score: number
    level: number
    constructor(name: string, score: number, level: number) {
        this.name = name
        this.score = score
        this.level = level
    }
}

export async function increase_player_score(db: Db, playerName: string, points: number) {
    // Увеличить счет игрока на указанное количество очков
    await db.collection("players").updateOne(
        { name: playerName },
        { $inc: { score: points } }
    );
}
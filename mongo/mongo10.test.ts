import { describe, expect, it } from "vitest";
import { increase_player_score, Player } from "./mongo10";
import { client, getDbName } from "./mongo_init";

describe('increase player score test', () => {
    it('should increase player score by points', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("players").insertMany([
                    new Player("Alice", 100, 1),
                    new Player("Bob", 200, 2)
                ])
                
                await increase_player_score(db, "Alice", 50)
                result = await db.collection("players").find({}).toArray()
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        const alice = result.find(p => p.name === "Alice")
        const bob = result.find(p => p.name === "Bob")
        
        expect(alice?.score).toBe(150)
        expect(bob?.score).toBe(200) // Не должен измениться
    });
});
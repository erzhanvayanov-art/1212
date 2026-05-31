import { describe, expect, it } from "vitest";
import { find_top_rated_movies, Movie } from "./mongo07";
import { client, getDbName } from "./mongo_init";

describe('find top rated movies test', () => {
    it('should find top rated movies sorted by rating', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("movies").insertMany([
                    new Movie("Movie A", 8.5, 2020),
                    new Movie("Movie B", 9.2, 2021),
                    new Movie("Movie C", 7.8, 2019),
                    new Movie("Movie D", 9.5, 2022)
                ])
                
                result = await find_top_rated_movies(db, 3)
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        expect(result.length).toBe(3)
        expect(result[0].rating).toBe(9.5)
        expect(result[1].rating).toBe(9.2)
        expect(result[2].rating).toBe(8.5)
    });
});
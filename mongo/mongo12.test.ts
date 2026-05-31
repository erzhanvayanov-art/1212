import { describe, expect, it } from "vitest";
import { find_posts_by_keyword, BlogPost } from "./mongo12";
import { client, getDbName } from "./mongo_init";

describe('find posts by keyword test', () => {
    it('should find posts containing keyword using $regex', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("posts").insertMany([
                    new BlogPost("JavaScript Basics", "Learn JavaScript fundamentals", ["programming"]),
                    new BlogPost("Advanced Python", "Deep dive into Python", ["programming"]),
                    new BlogPost("Cooking Recipes", "Delicious food ideas", ["food"]),
                    new BlogPost("Java Tutorial", "Introduction to Java programming", ["programming"])
                ])
                
                result = await find_posts_by_keyword(db, "Java")
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        expect(result.length).toBe(2)
        expect(result.some(p => p.title === "JavaScript Basics")).toBe(true)
        expect(result.some(p => p.title === "Java Tutorial")).toBe(true)
        expect(result.some(p => p.title === "Advanced Python")).toBe(false)
    });
});
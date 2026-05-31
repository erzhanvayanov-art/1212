import { describe, expect, it } from "vitest";
import { get_popular_tags, BlogPost } from "./mongo20";
import { client, getDbName } from "./mongo_init";

describe('popular tags test', () => {
    it('should find popular tags using $unwind', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("posts").insertMany([
                    new BlogPost("JavaScript Guide", ["programming", "javascript"], 1000),
                    new BlogPost("TypeScript Tips", ["programming", "typescript"], 800),
                    new BlogPost("React Tutorial", ["programming", "react", "javascript"], 1200),
                    new BlogPost("Cooking Recipes", ["food", "cooking"], 500)
                ])
                
                result = await get_popular_tags(db)
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        const programmingTag = result.find(t => t._id === "programming")
        const javascriptTag = result.find(t => t._id === "javascript")
        expect(programmingTag?.postCount).toBe(3)
        expect(javascriptTag?.postCount).toBe(2)
        expect(programmingTag?.totalViews).toBe(3000)
    });
});
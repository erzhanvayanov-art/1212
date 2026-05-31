import { describe, expect, it } from "vitest";
import { count_published_articles, Article } from "./mongo08";
import { client, getDbName } from "./mongo_init";

describe('count published articles test', () => {
    it('should count published articles', async () => {
        const dbName = getDbName()
        let totalPublished, techPublished
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("articles").insertMany([
                    new Article("Article 1", "Tech", true),
                    new Article("Article 2", "Tech", false),
                    new Article("Article 3", "Science", true),
                    new Article("Article 4", "Science", true)
                ])
                
                totalPublished = await count_published_articles(db)
                techPublished = await count_published_articles(db, "Tech")
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        expect(totalPublished).toBe(3)
        expect(techPublished).toBe(1)
    });
});
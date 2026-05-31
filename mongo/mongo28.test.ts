import { describe, expect, it } from "vitest";
import { search_articles, Article } from "./mongo28";
import { client, getDbName } from "./mongo_init";

describe('article search test', () => {
    it('should search articles using text search', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                // Создаем текстовый индекс
                await db.collection("articles").createIndex({ 
                    title: "text", 
                    content: "text" 
                })
                
                await db.collection("articles").insertMany([
                    new Article("JavaScript Programming Guide", "Learn JavaScript programming language basics", ["programming"], 100),
                    new Article("TypeScript Advanced Features", "Advanced TypeScript features and patterns", ["typescript"], 150),
                    new Article("Web Development Tutorial", "Complete web development tutorial with JavaScript", ["web", "javascript"], 200)
                ])                

                result = await search_articles(db, "JavaScript programming")
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        expect(result.length).toBeGreaterThan(0)
        expect(result[0].score).toBeDefined()
        // Первый результат должен быть наиболее релевантным
        expect(result[0].title).toContain("JavaScript")
    });
});
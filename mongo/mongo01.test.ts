import { describe, expect, it } from "vitest";
import { add_books, Book } from "./mongo01";
import { client, getDbName } from "./mongo_init";

describe('add multiple books test', () => {
    it('should add multiple books to collection', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                const books = [
                    new Book("Book 1", "Author 1", 2020),
                    new Book("Book 2", "Author 2", 2021),
                    new Book("Book 3", "Author 3", 2022)
                ]
                await add_books(db, books)
                result = await db.collection("books").find({}).toArray()
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        expect(result.length).toBe(3)
        expect(result[0].title).toBe("Book 1")
        expect(result[1].author).toBe("Author 2")
        expect(result[2].year).toBe(2022)
    });
});
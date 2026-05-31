import { describe, expect, it } from "vitest";
import { get_books_with_authors, Author, Book } from "./mongo24";
import { client, getDbName } from "./mongo_init";

describe('books with authors test', () => {
    it('should join books with authors and unwind', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("authors").insertMany([
                    new Author("auth1", "John Doe", "USA"),
                    new Author("auth2", "Jane Smith", "UK")
                ])
                
                await db.collection("books").insertMany([
                    new Book("JavaScript Guide", "auth1", "Programming", 300),
                    new Book("TypeScript Advanced", "auth1", "Programming", 400),
                    new Book("English Literature", "auth2", "Fiction", 250)
                ])
                
                result = await get_books_with_authors(db)
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        expect(result.length).toBe(3)
        expect(result[0].authorName).toBe("John Doe")
        expect(result[0].authorCountry).toBe("USA")
        expect(result[2].authorName).toBe("Jane Smith")
    });
});
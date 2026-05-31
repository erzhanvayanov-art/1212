import type { Db } from "mongodb"

export class Author {
    _id: string
    name: string
    country: string
    constructor(_id: string, name: string, country: string) {
        this._id = _id
        this.name = name
        this.country = country
    }
}

export class Book {
    title: string
    authorId: string
    genre: string
    pages: number
    constructor(title: string, authorId: string, genre: string, pages: number) {
        this.title = title
        this.authorId = authorId
        this.genre = genre
        this.pages = pages
    }
}

export interface BookWithAuthor {
    _id: any
    title: string
    genre: string
    pages: number
    authorId: string
    authorName: string
    authorCountry: string
}

export async function get_books_with_authors(db: Db): Promise<BookWithAuthor[]> {
    // Получить книги с информацией об авторах (развернуть массив авторов)
    return await db.collection("books").aggregate([
        {
            $lookup: {
                from: "authors",
                localField: "authorId",
                foreignField: "_id",
                as: "authorInfo"
            }
        },
        {
            $unwind: {
                path: "$authorInfo",
                preserveNullAndEmptyArrays: false // Exclude books without authors
            }
        },
        {
            $project: {
                _id: 1,
                title: 1,
                genre: 1,
                pages: 1,
                authorId: 1,
                authorName: "$authorInfo.name",
                authorCountry: "$authorInfo.country"
            }
        }
    ]).toArray() as BookWithAuthor[]
}
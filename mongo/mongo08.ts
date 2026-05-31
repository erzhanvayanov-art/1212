import type { Db } from "mongodb"

export class Article {
    title: string
    category: string
    published: boolean
    constructor(title: string, category: string, published: boolean) {
        this.title = title
        this.category = category
        this.published = published
    }
}

export async function count_published_articles(db: Db, category?: string): Promise<number> {
    // Посчитать количество опубликованных статей
    // Если передан category, считать только для этой категории
    const filter: any = { published: true };

    if (category) {
        filter.category = category;
    }

    return await db.collection("articles").countDocuments(filter);
}
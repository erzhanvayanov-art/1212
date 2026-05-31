import type { Db } from "mongodb"

export class BlogPost {
    title: string
    tags: string[]
    views: number
    constructor(title: string, tags: string[], views: number) {
        this.title = title
        this.tags = tags
        this.views = views
    }
}

export interface PopularTag {
    _id: string
    postCount: number
    totalViews: number
}

export async function get_popular_tags(db: Db): Promise<PopularTag[]> {
    // Найти самые популярные теги (по количеству постов и общему количеству просмотров)
    return await db.collection("posts").aggregate([
        {
            $unwind: "$tags"
        },
        {
            $group: {
                _id: "$tags",
                postCount: { $sum: 1 },
                totalViews: { $sum: "$views" }
            }
        },
        {
            $sort: { totalViews: -1, postCount: -1 }
        }
    ]).toArray() as PopularTag[]
}
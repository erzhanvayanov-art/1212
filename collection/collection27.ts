type Post = { tags: string[] };

export function findMostPopularTag(posts: Post[]): Record<string, number> {
    return posts
        .flatMap(post => post.tags)
        .reduce((acc, tag) => {
            acc[tag] = (acc[tag] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
}
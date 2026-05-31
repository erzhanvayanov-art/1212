import { Db, MongoClient, type MongoClientOptions } from "mongodb"

// Было (для Docker):
// const CONNECTION = "mongodb://root:example@mongo:27017/"

// Стало (для Windows):
const CONNECTION = "mongodb://localhost:27017/"

export const client = new MongoClient(
    CONNECTION,
    { monitorCommands: true } as MongoClientOptions
)

export async function run(code: (db: Db) => Promise<void>) {
    const dbName = "test" + genPrefix()
    try {
        await client.connect()
        const db = client.db(dbName)
        try {
            await code(db)
        }
        finally {
            await db.dropDatabase()
        }
    } finally {
        await client.close();
    }
}
console.log("RUN MONGO")

export function genPrefix() {
    return Math.floor(Math.random() * 10000).toString().padStart(4, '0')
}

export const getDbName = () => "test" + genPrefix()

export class User {
    name: string
    age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
}

export async function add_user(db: Db, user: User) {
    await db.createCollection("users")
    await db.collection("users").insertOne(user)
}
import { describe, expect, it } from "vitest";
import { find_cars_in_range, Car } from "./mongo09";
import { client, getDbName } from "./mongo_init";

describe('find cars in range test', () => {
    it('should find cars by year and price range', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("cars").insertMany([
                    new Car("Toyota", "Camry", 2020, 25000),
                    new Car("Honda", "Civic", 2018, 18000),
                    new Car("BMW", "X5", 2022, 60000),
                    new Car("Ford", "Focus", 2021, 22000)
                ])
                
                result = await find_cars_in_range(db, 2020, 30000)
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        expect(result.length).toBe(2)
        expect(result[0].brand).toBe("Toyota")
        expect(result[1].brand).toBe("Ford")
    });
});
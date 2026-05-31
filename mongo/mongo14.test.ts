import { describe, expect, it } from "vitest";
import { remove_member_from_project, Project } from "./mongo14";
import { client, getDbName } from "./mongo_init";

describe('remove member from project test', () => {
    it('should remove member from project team using $pull', async () => {
        const dbName = getDbName()
        let result
        try {
            await client.connect()
            const db = client.db(dbName)
            try {
                await db.collection("projects").insertMany([
                    new Project("Website Redesign", ["alice", "bob", "charlie"], "active"),
                    new Project("Mobile App", ["bob", "diana"], "planning")
                ])
                
                await remove_member_from_project(db, "Website Redesign", "bob")
                result = await db.collection("projects").find({}).toArray()
            }
            finally {
                await db.dropDatabase()
            }
        } finally {
            await client.close()
        }
        const websiteProject = result.find(p => p.name === "Website Redesign")
        const mobileProject = result.find(p => p.name === "Mobile App")
        
        expect(websiteProject?.team.length).toBe(2)
        expect(websiteProject?.team).toContain("alice")
        expect(websiteProject?.team).toContain("charlie")
        expect(websiteProject?.team).not.toContain("bob")
        expect(mobileProject?.team.length).toBe(2) // Не должен измениться
    });
});
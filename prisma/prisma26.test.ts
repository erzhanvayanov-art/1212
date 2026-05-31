import { describe, expect, it } from "vitest";
import { find_oldest_and_newest_students } from "./prisma26";
import { prisma, run } from "./prisma_init";

describe('find oldest and newest students test', () => {
    it('should find oldest and newest students using TS processing', async () => {
        await run(async () => {
            await prisma.grade.deleteMany()
            await prisma.student.deleteMany()
            await prisma.course.deleteMany()
            await prisma.person.deleteMany()

            // Создаем студентов с разными датами
            const now = new Date()
            await prisma.person.createMany({
                data: [
                    { email: 's1@test.com', name: 'Старый', createdAt: new Date(now.getTime() - 100000) },
                    { email: 's2@test.com', name: 'Средний', createdAt: new Date(now.getTime() - 50000) },
                    { email: 's3@test.com', name: 'Новый', createdAt: now }
                ]
            })

            const people = await prisma.person.findMany()
            await prisma.student.createMany({
                data: people.map(p => ({ personId: p.id }))
            })

            const result = await find_oldest_and_newest_students()
            
            expect(result.oldest.person.name).toBe('Старый')
            expect(result.newest.person.name).toBe('Новый')
        })
    })
})
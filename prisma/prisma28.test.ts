import { describe, expect, it } from "vitest";
import { delete_students_before_date } from "./prisma28";
import { prisma, run } from "./prisma_init";

describe('delete students before date test', () => {
    it('should delete students created before specific date using deleteMany', async () => {
        await run(async () => {
            await prisma.grade.deleteMany()
            await prisma.student.deleteMany()
            await prisma.course.deleteMany()
            await prisma.person.deleteMany()

            // Создаем студентов с разными датами
            const baseDate = new Date('2024-01-01')
            
            // Сначала создаем людей
            await prisma.person.createMany({
                data: [
                    { email: 's1@test.com', name: 'Старый' },
                    { email: 's2@test.com', name: 'Новый' },
                    { email: 's3@test.com', name: 'Средний' }
                ]
            })

            const people = await prisma.person.findMany()
            
            // Создаем студентов с явным указанием дат создания
            await prisma.student.createMany({
                data: [
                    { personId: people[0].id, createdAt: new Date(baseDate.getTime() - 100000) },
                    { personId: people[1].id, createdAt: new Date(baseDate.getTime() + 100000) },
                    { personId: people[2].id, createdAt: baseDate }
                ]
            })

            const initialCount = await prisma.student.count()
            expect(initialCount).toBe(3)

            const deletedCount = await delete_students_before_date(baseDate)
            
            expect(deletedCount).toBe(1) // Должен удалиться только "Старый"
            
            const remainingStudents = await prisma.student.findMany({
                include: { person: true }
            })
            
            expect(remainingStudents).toHaveLength(2)
            const names = remainingStudents.map(s => s.person.name)
            expect(names).toContain('Новый')
            expect(names).toContain('Средний')
            expect(names).not.toContain('Старый')
        })
    })
})
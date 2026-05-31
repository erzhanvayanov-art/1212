import { describe, expect, it } from "vitest";
import { delete_students_without_person } from "./prisma23";
import { prisma, run } from "./prisma_init";

describe('delete students without person test', () => {
    it('should delete students without person relation using deleteMany', async () => {
        await run(async () => {
            await prisma.grade.deleteMany()
            await prisma.student.deleteMany()
            await prisma.course.deleteMany()
            await prisma.person.deleteMany()

            // Создаем людей
            await prisma.person.createMany({
                data: [
                    { email: 'valid1@test.com', name: 'Валидный 1' },
                    { email: 'valid2@test.com', name: 'Валидный 2' }
                ]
            })

            const people = await prisma.person.findMany()
            
            // Создаем студентов с валидными personId
            await prisma.student.createMany({
                data: [
                    { personId: people[0].id },
                    { personId: people[1].id }
                ]
            })

            const initialCount = await prisma.student.count()
            expect(initialCount).toBe(2)

            const deletedCount = await delete_students_without_person()

            // Все студенты имеют person, поэтому ничего не должно удалиться
            expect(deletedCount).toBe(0)
            
            const remainingStudents = await prisma.student.count()
            expect(remainingStudents).toBe(2)
        })
    })
})
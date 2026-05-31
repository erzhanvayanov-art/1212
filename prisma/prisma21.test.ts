import { describe, expect, it } from "vitest";
import { find_students_without_courses } from "./prisma21";
import { prisma, run } from "./prisma_init";

describe('find students without courses test', () => {
    it('should find students without courses using Prisma filter', async () => {
        await run(async () => {
            await prisma.grade.deleteMany()
            await prisma.student.deleteMany()
            await prisma.course.deleteMany()
            await prisma.person.deleteMany()

            // Создаем студентов
            await prisma.person.createMany({
                data: [
                    { email: 's1@test.com', name: 'Алиса' },
                    { email: 's2@test.com', name: 'Боб' },
                    { email: 's3@test.com', name: 'Чарли' }
                ]
            })
            const people = await prisma.person.findMany()
            await prisma.student.createMany({
                data: people.map(p => ({ personId: p.id }))
            })

            // Создаем курс
            const course = await prisma.course.create({ data: { title: 'Математика' } })

            const students = await prisma.student.findMany({
                include: { person: true }
            })
            const alice = students.find(s => s.person.name === 'Алиса')!
            const bob = students.find(s => s.person.name === 'Боб')!

            // Добавляем оценки только Алисе и Бобу
            await prisma.grade.createMany({
                data: [
                    { grade: 5, studentId: alice.id, courseId: course.id },
                    { grade: 4, studentId: bob.id, courseId: course.id }
                ]
            })

            const result = await find_students_without_courses()
            
            expect(result).toHaveLength(1)
            expect(result[0].person.name).toBe('Чарли')
        })
    })
})
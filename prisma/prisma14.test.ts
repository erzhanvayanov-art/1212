import { describe, expect, it } from "vitest";
import { find_students_above_course_average } from "./prisma14";
import { prisma, run } from "./prisma_init";

describe('find students above course average test', () => {
    it('should find students with grades above course average', async () => {
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
            const course = await prisma.course.create({
                data: { title: 'Математика' }
            })

            const students = await prisma.student.findMany({
                include: { person: true }
            })

            const alice = students.find(s => s.person.name === 'Алиса')!
            const bob = students.find(s => s.person.name === 'Боб')!
            const charlie = students.find(s => s.person.name === 'Чарли')!

            // Добавляем оценки: 5, 4, 3 (среднее = 4)
            await prisma.grade.createMany({
                data: [
                    { grade: 5, studentId: alice.id, courseId: course.id },
                    { grade: 4, studentId: bob.id, courseId: course.id },
                    { grade: 3, studentId: charlie.id, courseId: course.id }
                ]
            })

            const result = await find_students_above_course_average('Математика')
            
            expect(result).toHaveLength(1)
            expect(result[0].person.name).toBe('Алиса')
            expect(result[0].grade).toBe(5)
        })
    })
})
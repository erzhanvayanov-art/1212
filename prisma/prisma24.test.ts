import { describe, expect, it } from "vitest";
import { find_students_with_all_courses } from "./prisma24";
import { prisma, run } from "./prisma_init";

describe('find students with all courses test', () => {
    it('should find students with grades in all courses using TS processing', async () => {
        await run(async () => {
            await prisma.grade.deleteMany()
            await prisma.student.deleteMany()
            await prisma.course.deleteMany()
            await prisma.person.deleteMany()

            // Создаем студентов
            await prisma.person.createMany({
                data: [
                    { email: 's1@test.com', name: 'Алиса' },
                    { email: 's2@test.com', name: 'Боб' }
                ]
            })
            const people = await prisma.person.findMany()
            await prisma.student.createMany({
                data: people.map(p => ({ personId: p.id }))
            })

            // Создаем 3 курса
            const courses = await prisma.course.createManyAndReturn({
                data: [
                    { title: 'Математика' },
                    { title: 'Физика' },
                    { title: 'Химия' }
                ]
            })

            const students = await prisma.student.findMany({
                include: { person: true }
            })
            const alice = students.find(s => s.person.name === 'Алиса')!
            const bob = students.find(s => s.person.name === 'Боб')!

            // Алиса имеет оценки по всем 3 курсам, Боб - только по 2
            await prisma.grade.createMany({
                data: [
                    // Алиса (все курсы)
                    { grade: 5, studentId: alice.id, courseId: courses[0].id },
                    { grade: 4, studentId: alice.id, courseId: courses[1].id },
                    { grade: 3, studentId: alice.id, courseId: courses[2].id },
                    // Боб (2 курса)
                    { grade: 4, studentId: bob.id, courseId: courses[0].id },
                    { grade: 3, studentId: bob.id, courseId: courses[1].id }
                ]
            })

            const result = await find_students_with_all_courses()
            
            expect(result).toHaveLength(1)
            expect(result[0].person.name).toBe('Алиса')
        })
    })
})
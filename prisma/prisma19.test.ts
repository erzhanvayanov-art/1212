import { describe, expect, it } from "vitest";
import { find_most_popular_course } from "./prisma19";
import { prisma, run } from "./prisma_init";

describe('find most popular course test', () => {
    it('should find course with most students using Prisma groupBy', async () => {
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

            // Создаем курсы
            const courses = await prisma.course.createManyAndReturn({
                data: [
                    { title: 'Математика' },
                    { title: 'Физика' },
                    { title: 'Химия' }
                ]
            })

            const students = await prisma.student.findMany()
            const mathCourse = courses.find(c => c.title === 'Математика')!
            const physicsCourse = courses.find(c => c.title === 'Физика')!
            const chemistryCourse = courses.find(c => c.title === 'Химия')!

            // Распределяем студентов по курсам:
            // Математика - 3 студента, Физика - 2 студента, Химия - 1 студент
            await prisma.grade.createMany({
                data: [
                    // Математика (3 студента)
                    { grade: 5, studentId: students[0].id, courseId: mathCourse.id },
                    { grade: 4, studentId: students[1].id, courseId: mathCourse.id },
                    { grade: 3, studentId: students[2].id, courseId: mathCourse.id },
                    // Физика (2 студента)
                    { grade: 4, studentId: students[0].id, courseId: physicsCourse.id },
                    { grade: 3, studentId: students[1].id, courseId: physicsCourse.id },
                    // Химия (1 студент)
                    { grade: 5, studentId: students[0].id, courseId: chemistryCourse.id }
                ]
            })

            const result = await find_most_popular_course()
            
            expect(result.title).toBe('Математика')
            expect(result.studentCount).toBe(3)
        })
    })
})
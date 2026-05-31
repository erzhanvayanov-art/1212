import { describe, expect, it } from "vitest";
import { find_courses_min_max_average } from "./prisma22";
import { prisma, run } from "./prisma_init";

describe('find courses min max average test', () => {
    it('should find courses with min and max average grade using TS processing', async () => {
        await run(async () => {
            await prisma.grade.deleteMany()
            await prisma.student.deleteMany()
            await prisma.course.deleteMany()
            await prisma.person.deleteMany()

            // Создаем студентов
            await prisma.person.createMany({
                data: [
                    { email: 's1@test.com', name: 'Студент 1' },
                    { email: 's2@test.com', name: 'Студент 2' },
                    { email: 's3@test.com', name: 'Студент 3' }
                ]
            })
            const people = await prisma.person.findMany()
            await prisma.student.createMany({
                data: people.map(p => ({ personId: p.id }))
            })

            // Создаем курсы
            const courses = await prisma.course.createManyAndReturn({
                data: [
                    { title: 'Математика' }, // среднее 4.5
                    { title: 'Физика' },     // среднее 3
                    { title: 'Химия' }       // среднее 2
                ]
            })

            const students = await prisma.student.findMany()
            const mathCourse = courses.find(c => c.title === 'Математика')!
            const physicsCourse = courses.find(c => c.title === 'Физика')!
            const chemistryCourse = courses.find(c => c.title === 'Химия')!

            // Добавляем оценки (уникальные комбинации)
            await prisma.grade.createMany({
                data: [
                    { grade: 5, studentId: students[0].id, courseId: mathCourse.id },
                    { grade: 4, studentId: students[1].id, courseId: mathCourse.id },
                    { grade: 3, studentId: students[0].id, courseId: physicsCourse.id },
                    { grade: 2, studentId: students[1].id, courseId: chemistryCourse.id }
                ]
            })

            const result = await find_courses_min_max_average()
            
            expect(result.min.title).toBe('Химия')
            expect(result.min.averageGrade).toBe(2)
            expect(result.max.title).toBe('Математика')
            expect(result.max.averageGrade).toBe(4.5)
        })
    })
})
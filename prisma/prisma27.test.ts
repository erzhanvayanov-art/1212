import { describe, expect, it } from "vitest";
import { find_courses_with_excellent_students } from "./prisma27";
import { prisma, run } from "./prisma_init";

describe('find courses with excellent students test', () => {
    it('should find courses with count of students having grade 5 using TS processing', async () => {
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

            // Математика: 2 отличника, Физика: 1 отличник, Химия: 0 отличников
            await prisma.grade.createMany({
                data: [
                    // Математика
                    { grade: 5, studentId: students[0].id, courseId: mathCourse.id },
                    { grade: 5, studentId: students[1].id, courseId: mathCourse.id },
                    { grade: 4, studentId: students[2].id, courseId: mathCourse.id },
                    // Физика
                    { grade: 5, studentId: students[0].id, courseId: physicsCourse.id },
                    { grade: 3, studentId: students[1].id, courseId: physicsCourse.id }
                ]
            })

            const result = await find_courses_with_excellent_students()
            
            const mathCourseResult = result.find(c => c.title === 'Математика')!
            const physicsCourseResult = result.find(c => c.title === 'Физика')!
            const chemistryCourseResult = result.find(c => c.title === 'Химия')!

            expect(mathCourseResult.excellentCount).toBe(2)
            expect(physicsCourseResult.excellentCount).toBe(1)
            expect(chemistryCourseResult.excellentCount).toBe(0)
        })
    })
})
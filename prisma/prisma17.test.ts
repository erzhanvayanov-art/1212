import { describe, expect, it } from "vitest";
import { delete_courses_without_grades } from "./prisma17";
import { prisma, run } from "./prisma_init";

describe('delete courses without grades test', () => {
    it('should delete courses without grades using deleteMany', async () => {
        await run(async () => {
            await prisma.grade.deleteMany()
            await prisma.student.deleteMany()
            await prisma.course.deleteMany()
            await prisma.person.deleteMany()

            // Создаем студента
            await prisma.person.create({ data: { email: 's@test.com', name: 'Студент' } })
            const person = await prisma.person.findFirst()
            const student = await prisma.student.create({ data: { personId: person!.id } })

            // Создаем курсы
            await prisma.course.createMany({
                data: [
                    { title: 'Математика' }, // с оценкой
                    { title: 'Физика' },     // без оценки
                    { title: 'Химия' }       // без оценки
                ]
            })

            const courses = await prisma.course.findMany()
            const mathCourse = courses.find(c => c.title === 'Математика')!

            // Добавляем оценку только по математике
            await prisma.grade.create({
                data: { grade: 5, studentId: student.id, courseId: mathCourse.id }
            })

            const initialCount = await prisma.course.count()
            expect(initialCount).toBe(3)

            const deletedCount = await delete_courses_without_grades()

            expect(deletedCount).toBe(2) // Должны удалиться Физика и Химия

            const remainingCourses = await prisma.course.findMany()
            expect(remainingCourses).toHaveLength(1)
            expect(remainingCourses[0].title).toBe('Математика')
        })
    })
})
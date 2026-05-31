import { describe, expect, it } from "vitest";
import { update_courses_without_grades_description } from "./prisma25";
import { prisma, run } from "./prisma_init";

describe('update courses without grades description test', () => {
    it('should update description for courses without grades using updateMany', async () => {
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
                    { title: 'Математика', description: 'Старое описание' },
                    { title: 'Физика', description: 'Старое описание' },
                    { title: 'Химия', description: 'Старое описание' }
                ]
            })

            const courses = await prisma.course.findMany()
            const mathCourse = courses.find(c => c.title === 'Математика')!

            // Добавляем оценку только по математике
            await prisma.grade.create({
                data: { grade: 5, studentId: student.id, courseId: mathCourse.id }
            })

            const updatedCount = await update_courses_without_grades_description()

            expect(updatedCount).toBe(2) // Физика и Химия

            // Проверяем обновленные описания
            const updatedCourses = await prisma.course.findMany()
            const physicsCourse = updatedCourses.find(c => c.title === 'Физика')!
            const chemistryCourse = updatedCourses.find(c => c.title === 'Химия')!
            const mathUpdatedCourse = updatedCourses.find(c => c.title === 'Математика')!

            expect(physicsCourse.description).toBe('Нет оценок')
            expect(chemistryCourse.description).toBe('Нет оценок')
            expect(mathUpdatedCourse.description).toBe('Старое описание')
        })
    })
})
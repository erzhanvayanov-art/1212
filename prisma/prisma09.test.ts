import { describe, expect, it } from "vitest";
import { delete_students_without_grades } from "./prisma09";
import { prisma, run } from "./prisma_init";

describe('delete students without grades test', () => {
    it('should delete students who have no grades', async () => {
        await run(async () => {
            await prisma.grade.deleteMany()
            await prisma.student.deleteMany()
            await prisma.course.deleteMany()
            await prisma.person.deleteMany()

            // Создаем людей
            await prisma.person.createMany({
                data: [
                    { email: 's1@test.com', name: 'Студент 1' },
                    { email: 's2@test.com', name: 'Студент 2' },
                    { email: 's3@test.com', name: 'Студент 3' },
                    { email: 's4@test.com', name: 'Студент 4' }
                ]
            })

            const people = await prisma.person.findMany()
            
            // Создаем студентов
            await prisma.student.createMany({
                data: people.map(person => ({ personId: person.id }))
            })

            // Создаем курс
            const course = await prisma.course.create({
                data: { title: 'Математика', description: 'Тест' }
            })

            const students = await prisma.student.findMany()

            // Добавляем оценки только первым двум студентам
            await prisma.grade.createMany({
                data: [
                    { grade: 4, studentId: students[0].id, courseId: course.id },
                    { grade: 5, studentId: students[1].id, courseId: course.id }
                ]
            })

            // Проверяем начальное количество студентов
            const initialCount = await prisma.student.count()
            expect(initialCount).toBe(4)

            // Удаляем студентов без оценок
            const deletedCount = await delete_students_without_grades()

            expect(deletedCount).toBe(2)

            // Проверяем конечное количество студентов
            const finalCount = await prisma.student.count()
            expect(finalCount).toBe(2)

            // Проверяем, что остались только студенты с оценками
            const remainingStudents = await prisma.student.findMany({
                include: { grades: true }
            })
            
            remainingStudents.forEach(student => {
                expect(student.grades.length).toBeGreaterThan(0)
            })
        })
    })
})
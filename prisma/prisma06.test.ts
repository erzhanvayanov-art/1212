import { describe, expect, it } from "vitest";
import { find_students_without_grades } from "./prisma06";
import { prisma, run } from "./prisma_init";

describe('find students without grades test', () => {
    it('should find students who have no grades', async () => {
        await run(async () => {
            await prisma.grade.deleteMany()
            await prisma.student.deleteMany()
            await prisma.course.deleteMany()
            await prisma.person.deleteMany()

            // Создаем людей
            await prisma.person.createMany({
                data: [
                    { email: 'student1@test.com', name: 'Студент 1' },
                    { email: 'student2@test.com', name: 'Студент 2' },
                    { email: 'student3@test.com', name: 'Студент 3' }
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

            const result = await find_students_without_grades()

            expect(result).toHaveLength(1)
            expect(result[0].person.name).toBe('Студент 3')
            expect(result[0].person.email).toBe('student3@test.com')
        })
    })
})
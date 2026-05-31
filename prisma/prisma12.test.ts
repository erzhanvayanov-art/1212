import { describe, expect, it } from "vitest";
import { find_top_students, StudentWithAverage } from "./prisma12";
import { prisma, run } from "./prisma_init";

describe('find top students test', () => {
    it('should find top students by average grade', async () => {
        await run(async () => {
            await prisma.grade.deleteMany()
            await prisma.student.deleteMany()
            await prisma.course.deleteMany()
            await prisma.person.deleteMany()

            // Создаем людей и студентов
            await prisma.person.createMany({
                data: [
                    { email: 'alice@test.com', name: 'Алиса' },
                    { email: 'bob@test.com', name: 'Боб' },
                    { email: 'charlie@test.com', name: 'Чарли' },
                    { email: 'diana@test.com', name: 'Диана' }
                ]
            })

            const people = await prisma.person.findMany()
            await prisma.student.createMany({
                data: people.map(person => ({ personId: person.id }))
            })

            // Создаем курсы
            await prisma.course.createMany({
                data: [
                    { title: 'Математика', description: 'Курс 1' },
                    { title: 'Физика', description: 'Курс 2' },
                    { title: 'Химия', description: 'Курс 3' }
                ]
            })

            const students = await prisma.student.findMany({
                include: { person: true }
            })
            const courses = await prisma.course.findMany()

            const alice = students.find(s => s.person.name === 'Алиса')!
            const bob = students.find(s => s.person.name === 'Боб')!
            const charlie = students.find(s => s.person.name === 'Чарли')!
            const diana = students.find(s => s.person.name === 'Диана')!

            // Добавляем оценки:
            // Алиса: 5, 5, 5 (среднее 5)
            // Боб: 4, 4, 5 (среднее 4.33)
            // Чарли: 3, 3, 4 (среднее 3.33)
            // Диана: нет оценок
            await prisma.grade.createMany({
                data: [
                    // Алиса
                    { grade: 5, studentId: alice.id, courseId: courses[0].id },
                    { grade: 5, studentId: alice.id, courseId: courses[1].id },
                    { grade: 5, studentId: alice.id, courseId: courses[2].id },
                    // Боб
                    { grade: 4, studentId: bob.id, courseId: courses[0].id },
                    { grade: 4, studentId: bob.id, courseId: courses[1].id },
                    { grade: 5, studentId: bob.id, courseId: courses[2].id },
                    // Чарли
                    { grade: 3, studentId: charlie.id, courseId: courses[0].id },
                    { grade: 3, studentId: charlie.id, courseId: courses[1].id },
                    { grade: 4, studentId: charlie.id, courseId: courses[2].id },
                ]
            })

            const topStudents = await find_top_students(3)

            expect(topStudents).toHaveLength(3)
            
            // Проверяем порядок и данные
            expect(topStudents[0].studentName).toBe('Алиса')
            expect(topStudents[0].averageGrade).toBeCloseTo(5, 2)
            expect(topStudents[0].gradeCount).toBe(3)

            expect(topStudents[1].studentName).toBe('Боб')
            expect(topStudents[1].averageGrade).toBeCloseTo(4.33, 2)
            expect(topStudents[1].gradeCount).toBe(3)

            expect(topStudents[2].studentName).toBe('Чарли')
            expect(topStudents[2].averageGrade).toBeCloseTo(3.33, 2)
            expect(topStudents[2].gradeCount).toBe(3)

            // Диана не должна попасть в результат (нет оценок)
            const dianaInResults = topStudents.find(s => s.studentName === 'Диана')
            expect(dianaInResults).toBeUndefined()
        })
    })
})
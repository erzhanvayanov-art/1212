import { describe, expect, it } from "vitest";
import { find_top_courses } from "./prisma13";
import { prisma, run } from "./prisma_init";

describe('find top courses test', () => {
    it('should find courses with highest average grade', async () => {
        await run(async () => {
            await prisma.grade.deleteMany()
            await prisma.student.deleteMany()
            await prisma.course.deleteMany()
            await prisma.person.deleteMany()

            // Создаем студентов
            await prisma.person.createMany({
                data: [
                    { email: 's1@test.com', name: 'Студент 1' },
                    { email: 's2@test.com', name: 'Студент 2' }
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
                    { title: 'Химия' }       // нет оценок
                ]
            })

            const students = await prisma.student.findMany()

            // Добавляем оценки (уникальные комбинации studentId + courseId)
            await prisma.grade.createMany({
                data: [
                    { grade: 5, studentId: students[0].id, courseId: courses[0].id },
                    { grade: 4, studentId: students[1].id, courseId: courses[0].id },
                    { grade: 3, studentId: students[0].id, courseId: courses[1].id }
                ]
            })

            const result = await find_top_courses(2)
            
            expect(result).toHaveLength(2)
            expect(result[0].title).toBe('Математика')
            expect(result[0].averageGrade).toBe(4.5)
            expect(result[1].title).toBe('Физика')
            expect(result[1].averageGrade).toBe(3)
        })
    })
})
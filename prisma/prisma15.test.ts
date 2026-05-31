import { describe, expect, it } from "vitest";
import { update_low_grades } from "./prisma15";
import { prisma, run } from "./prisma_init";

describe('update low grades test', () => {
    it('should update grades below 3 to 3 using updateMany', async () => {
        await run(async () => {
            await prisma.grade.deleteMany()
            await prisma.student.deleteMany()
            await prisma.course.deleteMany()
            await prisma.person.deleteMany()

            // Создаем студентов и курсы
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

            const courses = await prisma.course.createManyAndReturn({
                data: [
                    { title: 'Математика' },
                    { title: 'Физика' }
                ]
            })

            const students = await prisma.student.findMany()

            // Создаем оценки: 2, 3, 4, 1 (уникальные комбинации studentId + courseId)
            await prisma.grade.createMany({
                data: [
                    { grade: 2, studentId: students[0].id, courseId: courses[0].id },
                    { grade: 3, studentId: students[0].id, courseId: courses[1].id },
                    { grade: 4, studentId: students[1].id, courseId: courses[0].id },
                    { grade: 1, studentId: students[1].id, courseId: courses[1].id }
                ]
            })

            const updatedCount = await update_low_grades()

            expect(updatedCount).toBe(2) // Должны обновиться оценки 2 и 1

            // Проверяем обновленные оценки
            const grades = await prisma.grade.findMany()
            const gradeValues = grades.map(g => g.grade).sort()
            expect(gradeValues).toEqual([3, 3, 3, 4])
        })
    })
})
import { describe, expect, it } from "vitest";
import { find_student_progress_by_semester } from "./prisma30";
import { prisma, run } from "./prisma_init";

describe('find student progress by semester test', () => {
    it('should find student progress grouped by month using TS processing', async () => {
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
                    { title: 'Математика' },
                    { title: 'Физика' },
                    { title: 'Химия' }
                ]
            })

            const students = await prisma.student.findMany()
            const student1 = students[0]
            const mathCourse = courses.find(c => c.title === 'Математика')!
            const physicsCourse = courses.find(c => c.title === 'Физика')!
            const chemistryCourse = courses.find(c => c.title === 'Химия')!

            // Добавляем оценки за разные месяцы (уникальные комбинации studentId + courseId)
            await prisma.grade.createMany({
                data: [
                    // Январь 2024
                    { grade: 3, studentId: student1.id, courseId: mathCourse.id, createdAt: new Date('2024-01-15') },
                    { grade: 4, studentId: students[1].id, courseId: physicsCourse.id, createdAt: new Date('2024-01-20') },
                    // Февраль 2024
                    { grade: 5, studentId: student1.id, courseId: physicsCourse.id, createdAt: new Date('2024-02-10') },
                    { grade: 4, studentId: students[2].id, courseId: chemistryCourse.id, createdAt: new Date('2024-02-15') }
                ]
            })

            const result = await find_student_progress_by_semester()
            
            const student1Result = result.find((r: any) => r.studentId === student1.id)
            expect(student1Result).toBeDefined()
            expect(student1Result.progress).toHaveLength(2) // Два месяца
            
            const janProgress = student1Result.progress.find((p: any) => p.month === '2024-01')
            const febProgress = student1Result.progress.find((p: any) => p.month === '2024-02')
            
            expect(janProgress?.averageGrade).toBe(3)
            expect(janProgress?.gradeCount).toBe(1)
            expect(febProgress?.averageGrade).toBe(5)
            expect(febProgress?.gradeCount).toBe(1)
        })
    })
})
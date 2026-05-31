import { describe, expect, it } from "vitest";
import { get_course_average_grade } from "./prisma10";
import { prisma, run } from "./prisma_init";

describe('get course average grade test', () => {
    it('should calculate average grade for course', async () => {
        await run(async () => {
            await prisma.grade.deleteMany()
            await prisma.student.deleteMany()
            await prisma.course.deleteMany()
            await prisma.person.deleteMany()

            // Создаем людей и студентов
            await prisma.person.createMany({
                data: [
                    { email: 's1@test.com', name: 'Студент 1' },
                    { email: 's2@test.com', name: 'Студент 2' },
                    { email: 's3@test.com', name: 'Студент 3' }
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

            const students = await prisma.student.findMany()
            const courses = await prisma.course.findMany()

            const mathCourse = courses.find(c => c.title === 'Математика')!
            const physicsCourse = courses.find(c => c.title === 'Физика')!
            const chemistryCourse = courses.find(c => c.title === 'Химия')!

            // Добавляем оценки по математике: 4, 5, 3 (среднее = 4)
            await prisma.grade.createMany({
                data: [
                    { grade: 4, studentId: students[0].id, courseId: mathCourse.id },
                    { grade: 5, studentId: students[1].id, courseId: mathCourse.id },
                    { grade: 3, studentId: students[2].id, courseId: mathCourse.id }
                ]
            })

            // Добавляем одну оценку по физике
            await prisma.grade.create({
                data: { grade: 4, studentId: students[0].id, courseId: physicsCourse.id }
            })

            // По химии оценок нет

            const mathAverage = await get_course_average_grade('Математика')
            const physicsAverage = await get_course_average_grade('Физика')
            const chemistryAverage = await get_course_average_grade('Химия')
            const unknownAverage = await get_course_average_grade('Неизвестный курс')

            expect(mathAverage).toBeCloseTo(4, 1) // (4+5+3)/3 = 4
            expect(physicsAverage).toBeCloseTo(4, 1)
            expect(chemistryAverage).toBeNull()
            expect(unknownAverage).toBeNull()
        })
    })
})
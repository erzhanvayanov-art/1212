import { describe, it, expect } from 'vitest'
import { run, prisma, genPrefix } from './prisma_init'
import { find_grades_in_range } from './prisma04'

describe('find grades in range test', () => {
    it('should find grades within specified range', async () => {
        await run(async () => {
            // Очистка
            await prisma.grade.deleteMany()
            await prisma.student.deleteMany()
            await prisma.person.deleteMany()
            await prisma.course.deleteMany()

            // Создаем людей
            await prisma.person.createMany({
                data: [
                    { email: `s1_${genPrefix()}@test.com`, name: 'Student 1' },
                    { email: `s2_${genPrefix()}@test.com`, name: 'Student 2' },
                    { email: `s3_${genPrefix()}@test.com`, name: 'Student 3' },
                ]
            })

            const people = await prisma.person.findMany()

            // Создаем студентов
            await prisma.student.createMany({
                data: people.map(p => ({ personId: p.id }))
            })

            const students = await prisma.student.findMany()

            // Создаем курс
            await prisma.course.create({
                data: { title: 'Test Course' }
            })

            const course = await prisma.course.findFirst()

            // Создаем оценки (Grade)
            await prisma.grade.createMany({
                data: [
                    { studentId: students[0].id, courseId: course!.id, value: 2 },
                    { studentId: students[1].id, courseId: course!.id, value: 4 },
                    { studentId: students[2].id, courseId: course!.id, value: 5 },
                ]
            })

            // Тестируем функцию
            const results = await find_grades_in_range(3, 5)

            expect(results.length).toBe(2)
            expect(results.every(g => g.value >= 3 && g.value <= 5)).toBe(true)

            console.log('Найденные оценки:')
            results.forEach(g => {
                console.log(`Студент: ${g.student.person.name}, Оценка: ${g.value}, Курс: ${g.course.title}`)
            })
        })
    })
})
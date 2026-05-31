import { describe, expect, it } from "vitest";
import { find_courses_by_title_paginated } from "./prisma05";
import { prisma, run } from "./prisma_init";

describe('find courses by title with pagination test', () => {
    it('should find courses by title pattern with pagination', async () => {
        await run(async () => {
            await prisma.grade.deleteMany()
            await prisma.student.deleteMany()
            await prisma.course.deleteMany()
            await prisma.person.deleteMany()

            // Создаем курсы с четкими названиями
            const coursesData = [
                { title: 'Математика базовый', description: 'Курс 1', createdAt: new Date('2024-01-01') },
                { title: 'Математика продвинутый', description: 'Курс 2', createdAt: new Date('2024-01-02') },
                { title: 'Программирование', description: 'Курс 3', createdAt: new Date('2024-01-03') },
                { title: 'Математика анализ', description: 'Курс 4', createdAt: new Date('2024-01-04') },
                { title: 'Web разработка', description: 'Курс 5', createdAt: new Date('2024-01-05') }
            ]

            await prisma.course.createMany({ data: coursesData })

            // Проверяем, что курсы создались
            const allCourses = await prisma.course.findMany()

            // Ищем курсы с "Математика"
            const mathCourses = await prisma.course.findMany({
                where: { title: { contains: 'Математика' } }
            })
            expect(mathCourses).toHaveLength(3)

            // Тестируем пагинацию
            const page1 = await find_courses_by_title_paginated('Математика', 0, 2)
            expect(page1).toHaveLength(2)

            const page2 = await find_courses_by_title_paginated('Математика', 2, 2)
            expect(page2).toHaveLength(1)
        })
    })
})
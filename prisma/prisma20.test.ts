import { describe, expect, it } from "vitest";
import { update_student_names_pattern } from "./prisma20";
import { prisma, run } from "./prisma_init";

describe('update student names pattern test', () => {
    it('should update names replacing pattern using TS processing', async () => {
        await run(async () => {
            await prisma.grade.deleteMany()
            await prisma.student.deleteMany()
            await prisma.course.deleteMany()
            await prisma.person.deleteMany()

            // Создаем студентов
            await prisma.person.createMany({
                data: [
                    { email: 's1@test.com', name: 'Иван Иванов' },
                    { email: 's2@test.com', name: 'Петр Иванов' },
                    { email: 's3@test.com', name: 'Мария Петрова' }
                ]
            })
            const people = await prisma.person.findMany()
            await prisma.student.createMany({
                data: people.map(p => ({ personId: p.id }))
            })

            const updatedCount = await update_student_names_pattern('Иванов', 'Сидоров')

            expect(updatedCount).toBe(2)

            // Проверяем обновленные имена
            const students = await prisma.student.findMany({
                include: { person: true }
            })
            
            const names = students.map(s => s.person.name)
            expect(names).toContain('Иван Сидоров')
            expect(names).toContain('Петр Сидоров')
            expect(names).toContain('Мария Петрова')
        })
    })
})
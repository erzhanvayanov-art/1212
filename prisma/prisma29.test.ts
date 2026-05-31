import { describe, expect, it } from "vitest";
import { find_students_with_same_names } from "./prisma29";
import { prisma, run } from "./prisma_init";

describe('find students with same names test', () => {
    it('should find students with duplicate names using TS processing', async () => {
        await run(async () => {
            await prisma.grade.deleteMany()
            await prisma.student.deleteMany()
            await prisma.course.deleteMany()
            await prisma.person.deleteMany()

            // Создаем студентов с одинаковыми именами
            await prisma.person.createMany({
                data: [
                    { email: 'ivan1@test.com', name: 'Иван' },
                    { email: 'ivan2@test.com', name: 'Иван' },
                    { email: 'petr@test.com', name: 'Петр' },
                    { email: 'maria@test.com', name: 'Мария' },
                    { email: 'ivan3@test.com', name: 'Иван' }
                ]
            })

            const people = await prisma.person.findMany()
            await prisma.student.createMany({
                data: people.map(p => ({ personId: p.id }))
            })

            const result = await find_students_with_same_names()
            
            expect(result).toHaveLength(1) // Одна группа с одинаковыми именами
            expect(result[0].name).toBe('Иван')
            expect(result[0].students).toHaveLength(3) // Три Ивана
            
            const ivanEmails = result[0].students.map(s => s.person.email)
            expect(ivanEmails).toContain('ivan1@test.com')
            expect(ivanEmails).toContain('ivan2@test.com')
            expect(ivanEmails).toContain('ivan3@test.com')
        })
    })
})
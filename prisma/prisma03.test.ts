import { describe, expect, it } from "vitest";
import { find_students_by_name_pattern } from "./prisma03";
import { prisma, run } from "./prisma_init";

describe('find students by name pattern test', () => {
    it('should find students with name containing specific pattern', async () => {
        await run(async () => {
            await prisma.grade.deleteMany()
            await prisma.student.deleteMany()
            await prisma.course.deleteMany()
            await prisma.person.deleteMany()

            await prisma.person.createMany({
                data: [
                    { email: 'ivanov@example.com', name: 'Иван Иванов' },
                    { email: 'petrov@test.ru', name: 'Петр Петров' },
                    { email: 'sidorova@example.com', name: 'Мария Сидорова' },
                    { email: 'ivanova@test.ru', name: 'Ольга Иванова' }
                ]
            })

            const people = await prisma.person.findMany()
            
            await prisma.student.createMany({
                data: people.map(person => ({
                    personId: person.id
                }))
            })

            const result = await find_students_by_name_pattern('Иван')

            expect(result).toHaveLength(2)
            
            const names = result.map(s => s.person.name)
            expect(names).toContain('Иван Иванов')
            expect(names).toContain('Ольга Иванова')
            expect(names).not.toContain('Петр Петров')
        })
    })
})
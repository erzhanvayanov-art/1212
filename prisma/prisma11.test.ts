import { describe, expect, it } from "vitest";
import { update_students_email_domain } from "./prisma11";
import { prisma, run } from "./prisma_init";

describe('update students email domain test', () => {
    it('should update email domain for multiple students', async () => {
        await run(async () => {
            await prisma.grade.deleteMany()
            await prisma.student.deleteMany()
            await prisma.course.deleteMany()
            await prisma.person.deleteMany()

            // Создаем людей с разными доменами
            await prisma.person.createMany({
                data: [
                    { email: 'ivanov@old.com', name: 'Иван Иванов' },
                    { email: 'petrov@old.com', name: 'Петр Петров' },
                    { email: 'sidorova@new.org', name: 'Мария Сидорова' },
                    { email: 'smirnov@test.ru', name: 'Алексей Смирнов' }
                ]
            })

            const people = await prisma.person.findMany()
            await prisma.student.createMany({
                data: people.map(person => ({ personId: person.id }))
            })

            // Обновляем домен с @old.com на @updated.com
            const updatedCount = await update_students_email_domain('@old.com', '@updated.com')

            expect(updatedCount).toBe(2)

            // Проверяем обновленные emails
            const updatedStudents = await prisma.student.findMany({
                include: { person: true }
            })

            const oldDomainEmails = updatedStudents.filter(s => 
                s.person.email.endsWith('@old.com')
            )
            const updatedDomainEmails = updatedStudents.filter(s => 
                s.person.email.endsWith('@updated.com')
            )
            const otherEmails = updatedStudents.filter(s => 
                !s.person.email.endsWith('@old.com') && !s.person.email.endsWith('@updated.com')
            )

            expect(oldDomainEmails).toHaveLength(0)
            expect(updatedDomainEmails).toHaveLength(2)
            expect(otherEmails).toHaveLength(2)

            // Проверяем конкретные emails
            const emails = updatedStudents.map(s => s.person.email)
            expect(emails).toContain('ivanov@updated.com')
            expect(emails).toContain('petrov@updated.com')
            expect(emails).toContain('sidorova@new.org')
            expect(emails).toContain('smirnov@test.ru')
        })
    })
})
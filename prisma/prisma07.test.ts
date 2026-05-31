import { describe, expect, it } from "vitest";
import { update_student_email } from "./prisma07";
import { prisma, run } from "./prisma_init";

describe('update student email test', () => {
    it('should update student email by student ID', async () => {
        await run(async () => {
            await prisma.grade.deleteMany()
            await prisma.student.deleteMany()
            await prisma.course.deleteMany()
            await prisma.person.deleteMany()

            // Создаем человека и студента
            const person = await prisma.person.create({
                data: { email: 'old@test.com', name: 'Тест Студент' }
            })

            const student = await prisma.student.create({
                data: { personId: person.id }
            })

            // Обновляем email
            const updatedStudent = await update_student_email(student.id, 'new@test.com')

            expect(updatedStudent.person.email).toBe('new@test.com')
            expect(updatedStudent.person.name).toBe('Тест Студент')

            // Проверяем в базе
            const dbStudent = await prisma.student.findUnique({
                where: { id: student.id },
                include: { person: true }
            })
            expect(dbStudent?.person.email).toBe('new@test.com')
        })
    })
})
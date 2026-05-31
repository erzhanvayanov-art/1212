import { describe, expect, it } from "vitest";
import { find_courses_with_student_count, CourseWithStudentCount } from "./prisma08";
import { prisma, run } from "./prisma_init";

describe('find courses with student count test', () => {
    it('should find courses with count of unique students', async () => {
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
            const courses = await prisma.course.createMany({
                data: [
                    { title: 'Математика', description: 'Курс 1' },
                    { title: 'Физика', description: 'Курс 2' },
                    { title: 'Химия', description: 'Курс 3' }
                ]
            })

            const allStudents = await prisma.student.findMany()
            const allCourses = await prisma.course.findMany()

            // Добавляем оценки: 
            // Математика - 3 студента, Физика - 2 студента, Химия - 0 студентов
            await prisma.grade.createMany({
                data: [
                    // Математика
                    { grade: 4, studentId: allStudents[0].id, courseId: allCourses[0].id },
                    { grade: 5, studentId: allStudents[1].id, courseId: allCourses[0].id },
                    { grade: 3, studentId: allStudents[2].id, courseId: allCourses[0].id },
                    // Физика
                    { grade: 4, studentId: allStudents[0].id, courseId: allCourses[1].id },
                    { grade: 5, studentId: allStudents[1].id, courseId: allCourses[1].id },
                ]
            })

            const result = await find_courses_with_student_count()

            expect(result).toHaveLength(3)
            
            const mathCourse = result.find(c => c.title === 'Математика')
            const physicsCourse = result.find(c => c.title === 'Физика')
            const chemistryCourse = result.find(c => c.title === 'Химия')

            expect(mathCourse?.studentCount).toBe(3)
            expect(physicsCourse?.studentCount).toBe(2)
            expect(chemistryCourse?.studentCount).toBe(0)
        })
    })
})
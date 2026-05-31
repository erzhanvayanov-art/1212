import { prisma } from './prisma_init'

export interface CourseWithStudentCount {
    id: number
    title: string
    description: string | null
    studentCount: number
}

export async function find_courses_with_student_count(): Promise<CourseWithStudentCount[]> {
    // Найти все курсы с количеством уникальных студентов, имеющих оценки по этому курсу
    const courses = await prisma.course.findMany({
        include: {
            grades: {
                select: {
                    studentId: true
                }
            }
        }
    });

    // Подсчитываем количество уникальных студентов для каждого курса
    return courses.map(course => ({
        id: course.id,
        title: course.title,
        description: course.description,
        studentCount: new Set(course.grades.map(g => g.studentId)).size
    }));
}
import { prisma } from './prisma_init'

export async function find_courses_with_excellent_students() {
    // Найти курсы с количеством студентов, имеющих оценку 5 по этому курсу
    // Вернуть массив курсов с дополнительным полем excellentCount

    // Получаем все курсы с их оценками
    const courses = await prisma.course.findMany({
        include: {
            grades: {
                where: {
                    grade: 5  // фильтруем только оценки 5
                },
                select: {
                    studentId: true
                }
            }
        }
    });

    // Для каждого курса считаем количество уникальных студентов с оценкой 5
    return courses.map(course => {
        // Получаем уникальные studentId
        const uniqueStudentIds = new Set(course.grades.map(grade => grade.studentId));

        return {
            id: course.id,
            title: course.title,
            description: course.description,
            createdAt: course.createdAt,
            excellentCount: uniqueStudentIds.size  // для курсов без отличников будет 0
        };
    });
}
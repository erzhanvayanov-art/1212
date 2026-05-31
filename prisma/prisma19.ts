import { prisma } from './prisma_init'

export async function find_most_popular_course() {
    // Найти курс с максимальным количеством уникальных студентов
    // Использовать агрегацию средствами Prisma (groupBy)
    // Вернуть объект курса с дополнительным полем studentCount

    // Получаем все оценки и группируем по courseId
    const gradeGroups = await prisma.grade.groupBy({
        by: ['courseId'],
        _count: {
            studentId: true
        },
        orderBy: {
            _count: {
                studentId: 'desc'
            }
        },
        take: 1
    });

    if (gradeGroups.length === 0) {
        return null;
    }

    const mostPopular = gradeGroups[0];

    // Получаем информацию о курсе
    const course = await prisma.course.findUnique({
        where: {
            id: mostPopular.courseId
        }
    });

    if (!course) {
        return null;
    }

    return {
        ...course,
        studentCount: mostPopular._count.studentId
    };
}
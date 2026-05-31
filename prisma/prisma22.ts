import { prisma } from './prisma_init'

export async function find_courses_min_max_average() {
    // Найти курсы с минимальной и максимальной средней оценкой
    // Использовать обработку в TypeScript (не агрегацию Prisma)
    // Вернуть объект { min: курс, max: курс } с дополнительным полем averageGrade

    // Получаем все курсы с их оценками
    const courses = await prisma.course.findMany({
        include: {
            grades: {
                select: {
                    grade: true
                }
            }
        }
    });

    // Вычисляем среднюю оценку для каждого курса
    const coursesWithAverage = courses
        .map(course => {
            const grades = course.grades
                .map(g => g.grade)
                .filter((g): g is number => g !== null && g !== undefined);

            const averageGrade = grades.length > 0
                ? grades.reduce((sum, grade) => sum + grade, 0) / grades.length
                : 0;

            return {
                id: course.id,
                title: course.title,
                description: course.description,
                createdAt: course.createdAt,
                averageGrade: averageGrade
            };
        })
        .filter(course => course.averageGrade > 0); // только курсы с оценками

    if (coursesWithAverage.length === 0) {
        return { min: null, max: null };
    }

    // Находим курс с максимальной средней оценкой
    const maxCourse = coursesWithAverage.reduce((max, current) =>
        current.averageGrade > max.averageGrade ? current : max
    );

    // Находим курс с минимальной средней оценкой
    const minCourse = coursesWithAverage.reduce((min, current) =>
        current.averageGrade < min.averageGrade ? current : min
    );

    return {
        min: minCourse,
        max: maxCourse
    };
}
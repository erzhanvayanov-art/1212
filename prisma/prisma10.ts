import { prisma } from './prisma_init'

export async function get_course_average_grade(courseTitle: string): Promise<number | null> {
    // Найти среднюю оценку по указанному курсу
    // Вернуть среднее значение или null если курс не найден или нет оценок

    // Находим курс по названию с его оценками
    const course = await prisma.course.findFirst({
        where: {
            title: courseTitle
        },
        include: {
            grades: {
                select: {
                    grade: true
                }
            }
        }
    });

    // Если курс не найден, возвращаем null
    if (!course) {
        return null;
    }

    // Если нет оценок, возвращаем null
    if (course.grades.length === 0) {
        return null;
    }

    // Вычисляем среднюю оценку
    const sum = course.grades.reduce((acc, grade) => acc + (grade.grade || 0), 0);
    const average = sum / course.grades.length;

    return average;
}
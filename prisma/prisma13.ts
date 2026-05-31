import { prisma } from './prisma_init'

export async function find_top_courses(limit: number) {
    // Найти топ N курсов по средней оценке
    // Для каждого курса вычислить среднюю оценку из всех его оценок
    // Вернуть массив с id курса, названием и средней оценкой
    // Отсортировать по убыванию средней оценки
    // Использовать вычисление средней оценки в TypeScript коде (не через агрегацию Prisma)

    // Находим все курсы с их оценками
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
    const coursesWithAvg = courses.map(course => {
        const grades = course.grades
            .map(g => g.grade)
            .filter((g): g is number => g !== null && g !== undefined);

        let averageGrade = 0;
        if (grades.length > 0) {
            const sum = grades.reduce((acc, grade) => acc + grade, 0);
            averageGrade = sum / grades.length;
        }

        return {
            id: course.id,
            title: course.title,
            averageGrade: averageGrade
        };
    });

    // Фильтруем курсы, у которых есть хотя бы одна оценка
    const coursesWithGrades = coursesWithAvg.filter(course => course.averageGrade > 0);

    // Сортируем по убыванию средней оценки и берем топ limit
    return coursesWithGrades
        .sort((a, b) => b.averageGrade - a.averageGrade)
        .slice(0, limit);
}
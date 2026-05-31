import { prisma } from './prisma_init'

export async function find_students_with_most_courses() {
    // Найти студентов с максимальным количеством уникальных курсов
    // Использовать обработку данных в TypeScript (не агрегацию Prisma)
    // Вернуть массив студентов с информацией о person и количеством курсов

    // Получаем всех студентов с их оценками (включая курсы)
    const students = await prisma.student.findMany({
        include: {
            person: true,
            grades: {
                include: {
                    course: true
                }
            }
        }
    });

    // Для каждого студента вычисляем количество уникальных курсов
    const studentsWithCourseCount = students.map(student => {
        // Получаем уникальные courseId из оценок
        const uniqueCourseIds = new Set(student.grades.map(grade => grade.courseId));

        return {
            id: student.id,
            person: student.person,
            courseCount: uniqueCourseIds.size
        };
    });

    // Находим максимальное количество курсов
    const maxCourseCount = Math.max(...studentsWithCourseCount.map(s => s.courseCount), 0);

    // Фильтруем студентов, у которых количество курсов равно максимальному
    const studentsWithMaxCourses = studentsWithCourseCount.filter(
        student => student.courseCount === maxCourseCount && student.courseCount > 0
    );

    return studentsWithMaxCourses;
}
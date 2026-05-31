import { prisma } from './prisma_init'

export async function find_students_with_all_courses() {
    // Найти студентов, у которых есть оценки по всем существующим курсам
    // Использовать обработку в TypeScript
    // Вернуть массив студентов с информацией о person

    // Получаем все курсы
    const allCourses = await prisma.course.findMany({
        select: {
            id: true
        }
    });

    const totalCourseCount = allCourses.length;

    if (totalCourseCount === 0) {
        return [];
    }

    // Получаем всех студентов с их оценками (включая курсы)
    const students = await prisma.student.findMany({
        include: {
            person: true,
            grades: {
                select: {
                    courseId: true
                }
            }
        }
    });

    // Фильтруем студентов, у которых есть оценки по всем курсам
    const studentsWithAllCourses = students.filter(student => {
        // Получаем уникальные courseId из оценок студента
        const studentCourseIds = new Set(student.grades.map(grade => grade.courseId));
        // Проверяем, что количество уникальных курсов студента равно общему количеству курсов
        return studentCourseIds.size === totalCourseCount;
    });

    return studentsWithAllCourses.map(student => ({
        id: student.id,
        person: student.person
    }));
}
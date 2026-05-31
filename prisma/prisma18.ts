import { prisma } from './prisma_init'

export async function find_students_with_excellent_grades() {
    // Найти всех студентов, у которых есть хотя бы одна оценка 5
    // Использовать обработку данных в TypeScript (не фильтрацию Prisma)
    // Вернуть массив студентов с информацией о person

    // Получаем всех студентов с их оценками
    const students = await prisma.student.findMany({
        include: {
            person: true,
            grades: {
                select: {
                    grade: true
                }
            }
        }
    });

    // Фильтруем студентов, у которых есть хотя бы одна оценка 5
    const studentsWithExcellentGrades = students.filter(student => {
        return student.grades.some(grade => grade.grade === 5);
    });

    // Возвращаем только нужные поля
    return studentsWithExcellentGrades.map(student => ({
        id: student.id,
        person: student.person
    }));
}
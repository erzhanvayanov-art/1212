import { prisma } from './prisma_init'

export async function find_top_students(limit: number) {
    // Найти топ N студентов по среднему баллу
    // Учитывать только студентов, у которых есть хотя бы одна оценка
    // Вернуть массив с id студента, именем, средним баллом и количеством оценок
    // Отсортировать по убыванию среднего балла

    // Находим всех студентов с их оценками
    const students = await prisma.student.findMany({
        where: {
            grades: {
                some: {}  // только студенты с хотя бы одной оценкой
            }
        },
        include: {
            person: {
                select: {
                    name: true
                }
            },
            grades: {
                select: {
                    grade: true
                }
            }
        }
    });

    // Вычисляем средний балл для каждого студента
    const studentsWithAvg = students.map(student => {
        const grades = student.grades
            .map(g => g.grade)
            .filter((g): g is number => g !== null);

        const sum = grades.reduce((acc, grade) => acc + grade, 0);
        const average = grades.length > 0 ? sum / grades.length : 0;

        return {
            id: student.id,
            studentName: student.person.name,  // ← "studentName", а не "name"
            averageGrade: average,
            gradeCount: grades.length
        };
    });

    // Сортируем по убыванию среднего балла и берем топ limit
    return studentsWithAvg
        .sort((a, b) => b.averageGrade - a.averageGrade)
        .slice(0, limit);
}
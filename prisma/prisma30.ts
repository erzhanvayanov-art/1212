import { prisma } from './prisma_init'

export async function find_student_progress_by_semester() {
    // Найти прогресс студентов по семестрам (группировка по месяцу создания оценок)
    // Использовать обработку в TypeScript
    // Вернуть массив с прогрессом по студентам и месяцам

    // Получаем всех студентов с их оценками
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

    const result = [];

    for (const student of students) {
        // Группируем оценки по месяцам
        const gradesByMonth: { [month: string]: { grades: number[], average: number } } = {};

        for (const grade of student.grades) {
            const date = grade.createdAt;
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

            if (!gradesByMonth[monthKey]) {
                gradesByMonth[monthKey] = { grades: [], average: 0 };
            }
            gradesByMonth[monthKey].grades.push(grade.grade || 0);
        }

        // Вычисляем среднюю оценку для каждого месяца
        for (const month in gradesByMonth) {
            const grades = gradesByMonth[month].grades;
            const average = grades.reduce((a, b) => a + b, 0) / grades.length;
            gradesByMonth[month].average = average;
        }

        // Сортируем месяцы по дате
        const sortedMonths = Object.keys(gradesByMonth).sort();

        // Формируем прогресс
        const progress = sortedMonths.map(month => ({
            month: month,
            averageGrade: gradesByMonth[month].average,
            gradeCount: gradesByMonth[month].grades.length
        }));

        if (progress.length > 0) {
            result.push({
                studentId: student.id,
                studentName: student.person.name,
                progress: progress
            });
        }
    }

    return result;
}
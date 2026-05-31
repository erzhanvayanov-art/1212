import { prisma } from './prisma_init'

export async function find_students_above_course_average(courseTitle: string) {
    // Найти студентов, у которых есть оценки по указанному курсу выше среднего балла по этому курсу
    // Вернуть массив студентов с информацией о person и их оценкой
    // Использовать два отдельных запроса: первый для нахождения среднего балла, второй для поиска студентов

    // Первый запрос: находим курс и вычисляем средний балл
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

    if (!course || course.grades.length === 0) {
        return [];
    }

    // Вычисляем средний балл по курсу
    const validGrades = course.grades
        .map(g => g.grade)
        .filter((g): g is number => g !== null && g !== undefined);

    const averageGrade = validGrades.reduce((sum, grade) => sum + grade, 0) / validGrades.length;

    // Второй запрос: находим студентов с оценками выше среднего
    const students = await prisma.student.findMany({
        where: {
            grades: {
                some: {
                    course: {
                        title: courseTitle
                    },
                    grade: {
                        gt: averageGrade
                    }
                }
            }
        },
        include: {
            person: true,
            grades: {
                where: {
                    course: {
                        title: courseTitle
                    }
                },
                select: {
                    grade: true
                }
            }
        }
    });

    // Форматируем результат
    return students.map(student => ({
        id: student.id,
        person: student.person,
        grade: student.grades[0]?.grade ?? null
    }));
}
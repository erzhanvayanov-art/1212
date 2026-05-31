import { prisma } from './prisma_init'

export async function find_students_without_courses() {
    // Найти всех студентов, у которых нет ни одного курса (оценок)
    // Использовать фильтрацию средствами Prisma (none)
    // Вернуть массив студентов с информацией о person

    const students = await prisma.student.findMany({
        where: {
            grades: {
                none: {}
            }
        },
        include: {
            person: true
        }
    });

    return students;
}
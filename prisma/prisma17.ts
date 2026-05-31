import { prisma } from './prisma_init'

export async function delete_courses_without_grades() {
    // Удалить все курсы, у которых нет ни одной оценки
    // Использовать один запрос deleteMany средствами Prisma
    // Вернуть количество удаленных курсов

    const result = await prisma.course.deleteMany({
        where: {
            grades: {
                none: {}
            }
        }
    });

    return result.count;
}
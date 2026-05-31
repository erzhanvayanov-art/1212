import { prisma } from './prisma_init'

export async function delete_students_before_date(date: Date) {
    // Удалить всех студентов, созданных до указанной даты
    // Использовать один запрос deleteMany средствами Prisma
    // Вернуть количество удаленных записей

    const result = await prisma.student.deleteMany({
        where: {
            createdAt: {
                lt: date  // lt = less than (меньше)
            }
        }
    });

    return result.count;
}
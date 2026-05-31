import { prisma } from './prisma_init'

export async function update_low_grades() {
    // Обновить все оценки ниже 3 на значение 3
    // Использовать один запрос updateMany средствами Prisma
    // Вернуть количество обновленных записей

    const result = await prisma.grade.updateMany({
        where: {
            grade: {
                lt: 3  // меньше 3
            }
        },
        data: {
            grade: 3
        }
    });

    return result.count;
}
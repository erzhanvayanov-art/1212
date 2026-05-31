import { prisma } from './prisma_init'

export async function find_courses_after_date(date: Date) {
    // Найти все курсы, созданные после указанной даты
    // Вернуть массив курсов
    return await prisma.course.findMany({
        where: {
            createdAt: {
                gt: date
            }
        },
        orderBy: {
            createdAt: 'desc'  // сортировка от новых к старым (опционально)
        }
    });
}
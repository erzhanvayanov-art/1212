import { prisma } from './prisma_init'

export async function update_courses_without_grades_description() {
    // Обновить описание курсов без оценок на "Нет оценок"
    // Использовать один запрос updateMany средствами Prisma
    // Вернуть количество обновленных курсов

    const result = await prisma.course.updateMany({
        where: {
            grades: {
                none: {}
            }
        },
        data: {
            description: "Нет оценок"
        }
    });

    return result.count;
}
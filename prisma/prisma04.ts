import { prisma } from "./prisma_init";

export async function find_grades_in_range(minGrade: number, maxGrade: number) {
    // Найти все оценки в диапазоне от minGrade до maxGrade включительно
    // Вернуть массив оценок с включенной информацией о студенте и курсе
    return await prisma.grade.findMany({
        where: {
            value: {
                gte: minGrade,
                lte: maxGrade
            }
        },
        include: {
            student: {
                include: {
                    person: true
                }
            },
            course: true
        }
    });
}
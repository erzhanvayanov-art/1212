import { prisma } from './prisma_init'

export async function find_oldest_and_newest_students() {
    // Получаем всех студентов, отсортированных по дате создания
    const students = await prisma.student.findMany({
        orderBy: {
            createdAt: 'asc'
        },
        include: {
            person: true
        }
    });

    if (students.length === 0) {
        return { oldest: null, newest: null };
    }

    return {
        oldest: students[0],                    // первый (самый старый)
        newest: students[students.length - 1]   // последний (самый новый)
    };
}
import { prisma } from './prisma_init'

export async function delete_students_without_grades() {
    // Удалить всех студентов, у которых нет ни одной оценки
    // Вернуть количество удаленных студентов

    // Сначала находим студентов без оценок
    const studentsToDelete = await prisma.student.findMany({
        where: {
            grades: {
                none: {}
            }
        },
        select: {
            id: true,
            personId: true
        }
    });

    // Удаляем связанные записи Person
    const personIds = studentsToDelete.map(s => s.personId);

    if (personIds.length > 0) {
        // Удаляем студентов (каскадное удаление удалит связи, но не Person)
        await prisma.student.deleteMany({
            where: {
                id: {
                    in: studentsToDelete.map(s => s.id)
                }
            }
        });

        // Удаляем записи Person
        await prisma.person.deleteMany({
            where: {
                id: {
                    in: personIds
                }
            }
        });
    }

    return studentsToDelete.length;
}
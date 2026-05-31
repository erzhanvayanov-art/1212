import { prisma } from './prisma_init'

export async function delete_students_without_person() {
    // Удалить студентов, у которых нет связанной записи в person
    // Вернуть количество удаленных записей

    // Находим всех студентов
    const allStudents = await prisma.student.findMany({
        include: {
            person: true
        }
    });

    // Фильтруем студентов без Person в TypeScript
    const studentsWithoutPerson = allStudents.filter(student => !student.person);

    const studentIds = studentsWithoutPerson.map(s => s.id);

    if (studentIds.length === 0) {
        return 0;
    }

    // Удаляем найденных студентов
    const result = await prisma.student.deleteMany({
        where: {
            id: {
                in: studentIds
            }
        }
    });

    return result.count;
}
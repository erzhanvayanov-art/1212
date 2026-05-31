import { prisma } from './prisma_init'

export async function find_students_with_same_names() {
    // Найти студентов с одинаковыми именами
    // Использовать обработку в TypeScript
    // Вернуть массив групп студентов с одинаковыми именами

    // Получаем всех студентов с их данными Person
    const students = await prisma.student.findMany({
        include: {
            person: true
        }
    });

    // Группируем студентов по имени
    const studentsByName: { [name: string]: typeof students } = {};

    for (const student of students) {
        const name = student.person.name;
        if (!studentsByName[name]) {
            studentsByName[name] = [];
        }
        studentsByName[name].push(student);
    }

    // Фильтруем только те имена, которые встречаются более одного раза
    const result = Object.entries(studentsByName)
        .filter(([name, studentsList]) => studentsList.length > 1)
        .map(([name, studentsList]) => ({
            name: name,
            students: studentsList.map(student => ({
                id: student.id,
                person: student.person
            }))
        }));

    return result;
}
import { prisma } from './prisma_init'

export async function update_student_names_pattern(oldPattern: string, newPattern: string) {
    // Обновить имена студентов, заменяя oldPattern на newPattern
    // Использовать обработку в TypeScript с отдельными запросами update
    // Вернуть количество обновленных студентов

    // Находим всех студентов с их данными Person
    const students = await prisma.student.findMany({
        include: {
            person: true
        }
    });

    let updatedCount = 0;

    // Для каждого студента проверяем, содержит ли его имя oldPattern
    for (const student of students) {
        const currentName = student.person.name;

        if (currentName.includes(oldPattern)) {
            const newName = currentName.replaceAll(oldPattern, newPattern);

            // Обновляем имя в таблице Person
            await prisma.person.update({
                where: { id: student.personId },
                data: { name: newName }
            });

            updatedCount++;
        }
    }

    return updatedCount;
}
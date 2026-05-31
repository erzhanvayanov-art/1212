import { prisma } from './prisma_init'

export async function update_students_email_domain(oldDomain: string, newDomain: string) {
    // Обновить email у всех студентов, у которых email заканчивается на oldDomain
    // Заменить домен на newDomain
    // Вернуть количество обновленных записей

    // Находим всех студентов с email, заканчивающимся на oldDomain
    const students = await prisma.student.findMany({
        where: {
            person: {
                email: {
                    endsWith: oldDomain
                }
            }
        },
        include: {
            person: true
        }
    });

    // Обновляем email каждого студента
    let updatedCount = 0;

    for (const student of students) {
        const oldEmail = student.person.email;
        // Заменяем домен в email
        const localPart = oldEmail.replace(oldDomain, '');
        const newEmail = localPart + newDomain;

        // Обновляем email в таблице Person
        await prisma.person.update({
            where: { id: student.personId },
            data: { email: newEmail }
        });

        updatedCount++;
    }

    return updatedCount;
}
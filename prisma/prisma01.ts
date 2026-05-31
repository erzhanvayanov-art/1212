import { prisma } from "./prisma_init";

export async function find_students_by_email_domain(domain: string) {
    // Найти всех студентов, у которых email заканчивается на указанный домен
    // Вернуть массив студентов с включенной информацией о person
    return await prisma.student.findMany({
        where: {
            person: {
                email: {
                    endsWith: domain
                }
            }
        },
        include: {
            person: true
        }
    });
}
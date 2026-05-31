import { prisma } from "./prisma_init";

export async function find_students_without_grades() {
  // Найти всех студентов, у которых нет ни одной оценки
  // Вернуть массив студентов с включенной информацией о person
  return await prisma.student.findMany({
    where: {
      grades: {
        none: {}
      }
    },
    include: {
      person: true
    }
  });
}
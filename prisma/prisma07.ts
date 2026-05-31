import { prisma } from "./prisma_init";

export async function update_student_email(
  studentId: number,
  newEmail: string
) {
  // Обновить email студента по его ID
  // Вернуть обновленного студента с информацией о person

  // Сначала находим студента, чтобы получить personId
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    include: { person: true }
  });

  if (!student) {
    throw new Error(`Student with id ${studentId} not found`);
  }

  // Обновляем email в связанной записи Person
  const updatedPerson = await prisma.person.update({
    where: { id: student.personId },
    data: { email: newEmail }
  });

  // Возвращаем студента с обновленными данными person
  return await prisma.student.findUnique({
    where: { id: studentId },
    include: { person: true }
  });
}
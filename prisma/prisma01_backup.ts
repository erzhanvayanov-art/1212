import { prisma } from "./prisma_init";

export async function find_students_by_email_domain(domain: string) {
  const students = await prisma.student.findMany({
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
  return students;
}
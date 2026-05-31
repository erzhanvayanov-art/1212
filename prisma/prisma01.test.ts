import { describe, expect, it } from "vitest"; import { find_students_by_email_domain } from "./prisma01";
import { prisma, run } from "./prisma_init";

describe("find students by email domain test", () => {
  it("should find students with specific email domain", async () => {
    await run(async () => {
      // Очищаем базу перед тестом
      await prisma.grade.deleteMany();
      await prisma.student.deleteMany();
      await prisma.course.deleteMany();
      await prisma.person.deleteMany();

      // Создаем тестовые данные
      await prisma.person.createMany({
        data: [
          { email: "ivanov@example.com", name: "Иван Иванов" },
          { email: "petrov@test.ru", name: "Петр Петров" },
          { email: "sidorova@example.com", name: "Мария Сидорова" },
          { email: "smirnov@test.ru", name: "Алексей Смирнов" },
        ],
      });

      const people = await prisma.person.findMany();

      await prisma.student.createMany({
        data: people.map((person) => ({
          personId: person.id,
        })),
      });

      // Ищем студентов с доменом example.com
      const result = await find_students_by_email_domain("@example.com");

      expect(result).toHaveLength(2);
      expect(result[0].person.email).toMatch(/@example\.com$/);
      expect(result[1].person.email).toMatch(/@example\.com$/);

      const emails = result.map((s) => s.person.email);
      expect(emails).toContain("ivanov@example.com");
      expect(emails).toContain("sidorova@example.com");
    });
  });
});
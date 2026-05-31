import { PrismaClient } from "../../src/generated/prisma/client";
import dotenv from "dotenv";

dotenv.config();
export const prisma = new PrismaClient()

export async function run(code: () => Promise<void>) {
  try {
    await code()
  } catch (error) {
    console.error('❌ Ошибка:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

export function genPrefix() {
  return Math.floor(Math.random() * 10000).toString().padStart(4, '0')
}
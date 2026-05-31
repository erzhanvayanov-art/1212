/* 
  Настройте класс так, чтобы опциональное поле manager восстанавливалось как User или оставалось null.
*/

import "reflect-metadata";
import { User } from "./user";
import { Type } from "class-transformer";

export class Employee {
  name: string;

  @Type(() => User)
  manager: User | null; // Требует декоратора для типа

  constructor(name: string, manager: User | null) {
    this.name = name;
    this.manager = manager;
  }
}
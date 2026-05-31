/* 
  Добавьте все необходимые декораторы для корректного восстановления сложной структуры.
*/

import "reflect-metadata";
import { User } from "./user";
import { Type } from "class-transformer";

export class Course {
  title: string;

  @Type(() => User)
  instructor: User; // Требует декоратора

  @Type(() => User)
  students: User[]; // Требует декоратора

  @Type(() => Date)
  schedule: Date; // Требует декоратора

  constructor(title: string, instructor: User, students: User[], schedule: Date) {
    this.title = title;
    this.instructor = instructor;
    this.students = students;
    this.schedule = schedule;
  }
}
/* 	
  Добавьте необходимые декораторы в класс Department, чтобы вложенные сотрудники восстанавливались правильно.
*/

import "reflect-metadata";
import { User } from "./user";
import { Type } from "class-transformer";

export class Department {
  name: string;

  @Type(() => User)
  employees: User[];

  constructor(name: string, employees: User[]) {
    this.name = name;
    this.employees = employees;
  }
}

export class Company {
  name: string;

  @Type(() => Department)
  departments: Department[];

  constructor(name: string, departments: Department[]) {
    this.name = name;
    this.departments = departments;
  }
}
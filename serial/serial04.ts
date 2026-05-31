/* 
  Настройте класс Project с помощью декораторов для работы с разными типами вложенных данных.
*/

import "reflect-metadata";
import { User } from "./user";
import { Type } from "class-transformer";

export class Project {
  name: string;

  @Type(() => User)
  lead: User; // Требует декоратора

  @Type(() => User)
  developers: User[]; // Требует декоратора

  constructor(name: string, lead: User, developers: User[]) {
    this.name = name;
    this.lead = lead;
    this.developers = developers;
  }
}
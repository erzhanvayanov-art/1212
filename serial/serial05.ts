/* 	
  Добавьте декоратор для преобразования строки в объект Date.
*/

import "reflect-metadata";
import { User } from "./user";
import { Type } from "class-transformer";

export class Session {
  @Type(() => User)
  user: User; // Требует декоратора

  @Type(() => Date)
  loginAt: Date; // Требует декоратора Date

  constructor(user: User, loginAt: Date) {
    this.user = user;
    this.loginAt = loginAt;
  }

  getInfo() {
    return `${this.user.getFullName()} at ${this.loginAt.toLocaleDateString()}`;
  }
}
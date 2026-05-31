import "reflect-metadata";
import { User } from "./user";
import { Type } from "class-transformer";

export class Order {
  id: number;
  product: string;

  @Type(() => User)
  customer: User;

  constructor(
    id: number,
    product: string,
    firstName: string,
    lastName: string
  ) {
    this.id = id;
    this.product = product;
    this.customer = new User(firstName, lastName);
  }

  getOrderInfo() {
    return `Order #${this.id} by ${this.customer.getFullName()}`;
  }
}
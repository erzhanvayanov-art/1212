import { User } from "./user";
import { Type } from "class-transformer";

export class Team {
  name: string;

  @Type(() => User)
  members: User[];

  constructor(name: string, members: User[]) {
    this.name = name;
    this.members = members;
  }

  listMembers() {
    return this.members.map(m => m.getFullName()).join(', ');
  }
}
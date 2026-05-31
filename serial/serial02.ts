import { User } from "./user";

export class Team {
  name: string;
  members: User[];

  constructor(name: string, members: User[]) {
    this.name = name;
    this.members = members.map(m =>
      m instanceof User ? m : new User(m.firstName, m.lastName)
    );
  }

  listMembers() {
    return this.members.map(m => m.getFullName()).join(', ');
  }
}
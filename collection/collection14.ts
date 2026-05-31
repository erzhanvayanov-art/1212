export type User = {
  name: string;
}

export function getNames(users: User[]): string[] {
  return users.map(user => user.name);
}
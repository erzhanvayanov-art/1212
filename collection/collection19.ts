type User = {
  name: string;
  age: number;
  rating: number;
};

export function getTopAdultUsers(users: User[]): User[] {
  return users
    .filter(user => user.age > 18 && user.rating > 4.5)
    .sort((a, b) => a.name.localeCompare(b.name));
}
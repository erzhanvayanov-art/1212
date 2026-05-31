import { describe, it, expect } from 'vitest';
import { getTopAdultUsers } from './collection19';

describe('getTopAdultUsers', () => {
  it('should return sorted adult users with high rating', () => {
    const users = [
      { name: 'Charlie', age: 25, rating: 4.8 },
      { name: 'Alice', age: 17, rating: 4.9 },
      { name: 'Bob', age: 30, rating: 4.4 },
      { name: 'David', age: 22, rating: 4.7 }
    ];
    expect(getTopAdultUsers(users)).toEqual([
      { name: 'Charlie', age: 25, rating: 4.8 },
      { name: 'David', age: 22, rating: 4.7 }
    ]);
  });
});
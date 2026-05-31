import { describe, it, expect } from 'vitest';
import { findMaxWithCondition } from './collection24';

describe('findMaxWithCondition', () => {
  it('should find max with condition', () => {
    const users = [
      { name: 'Alice', age: 25, active: true },
      { name: 'Bob', age: 30, active: false },
      { name: 'Charlie', age: 35, active: true },
      { name: 'David', age: 40, active: true }
    ];

    const result = findMaxWithCondition(users, 'age', user => user.active);
    expect(result?.name).toBe('David');
    expect(result?.age).toBe(40);
  });

  it('should return null when no items match condition', () => {
    const users = [
      { name: 'Bob', age: 30, active: false }
    ];
    expect(findMaxWithCondition(users, 'age', user => user.active)).toBeNull();
  });

  it('should handle empty arrays', () => {
    expect(findMaxWithCondition([], 'age', () => true)).toBeNull();
  });
});
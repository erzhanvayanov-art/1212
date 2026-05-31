import { describe, it, expect } from 'vitest';
import { groupBy } from './collection11';

describe('groupBy', () => {
  it('should group objects by property value', () => {
    const users = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 25 },
      { id: 3, name: 'Charlie', age: 30 }
    ];
    
    const result = groupBy(users, 'age');
    expect(result.get(25)).toHaveLength(2);
    expect(result.get(30)).toHaveLength(1);
    expect(result.get(25)?.map(u => u.name)).toEqual(['Alice', 'Bob']);
  });
});

import { describe, it, expect } from 'vitest';
import { filterEven } from './collection04';

describe('filterEven', () => {
  it('should filter even numbers from array', () => {
    const gen = filterEven([1, 2, 3, 4, 5, 6]);
    expect([...gen]).toEqual([2, 4, 6]);
  });
});

import { describe, it, expect } from 'vitest';
import { unionSets } from './collection08';

describe('unionSets', () => {
  it('should return union of two sets', () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([3, 4, 5]);
    expect([...unionSets(set1, set2)]).toEqual([1, 2, 3, 4, 5]);
  });
});

import { describe, it, expect } from 'vitest';
import { findIntersection } from './collection09';

describe('findIntersection', () => {
  it('should find intersection of two arrays', () => {
    expect(findIntersection([1, 2, 3, 4], [3, 4, 5, 6])).toEqual([3, 4]);
    expect(findIntersection([1, 2], [3, 4])).toEqual([]);
  });
});

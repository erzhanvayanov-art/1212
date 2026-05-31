import { describe, it, expect } from 'vitest';
import { squaresWithIndex } from './collection16';

describe('squaresWithIndex', () => {
  it('should return objects with number, square and index', () => {
    const result = squaresWithIndex([2, 3, 4]);
    expect(result).toEqual([
      {num: 2, square: 4, index: 0},
      {num: 3, square: 9, index: 1},
      {num: 4, square: 16, index: 2}
    ]);
  });
});
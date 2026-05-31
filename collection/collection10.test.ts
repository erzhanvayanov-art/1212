import { describe, it, expect } from 'vitest';
import { invertMap } from './collection10';

describe('invertMap', () => {
  it('should invert keys and values', () => {
    const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
    const inverted = invertMap(map);
    expect(inverted.get(1)).toBe('a');
    expect(inverted.get(2)).toBe('b');
    expect(inverted.get(3)).toBe('c');
  });
});

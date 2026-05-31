import { describe, it, expect } from 'vitest';
import { obj } from './collection02';

describe('object iterator', () => {
  it('should iterate over object values', () => {
    const values = [];
    for (const value of obj) values.push(value);
    expect(values).toEqual([1, 2, 3]);
  });
});
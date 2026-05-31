import { describe, it, expect } from 'vitest';
import { range } from './collection05';

describe('range', () => {
  it('should generate numbers in range inclusive', () => {
    const gen = range(2, 5);
    expect([...gen]).toEqual([2, 3, 4, 5]);
  });
});
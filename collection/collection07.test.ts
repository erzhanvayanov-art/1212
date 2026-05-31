import { describe, it, expect } from 'vitest';
import { countFrequency } from './collection07';

describe('countFrequency', () => {
  it('should count frequency of elements', () => {
    const result = countFrequency(['a', 'b', 'a', 'c', 'b', 'a']);
    expect(result.get('a')).toBe(3);
    expect(result.get('b')).toBe(2);
    expect(result.get('c')).toBe(1);
  });
});
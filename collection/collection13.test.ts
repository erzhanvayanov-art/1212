import { describe, it, expect } from 'vitest';
import { countByRanges } from './collection13';

describe('countByRanges', () => {
  it('should count numbers in specified ranges', () => {
    const numbers = [1, 5, 10, 15, 20, 25];
    const ranges: [number, number][] = [[0, 10], [11, 20], [21, 30]];
    
    const result = countByRanges(numbers, ranges);
    expect(result.get('0-10')).toBe(3); // 1, 5, 10
    expect(result.get('11-20')).toBe(2); // 15, 20
    expect(result.get('21-30')).toBe(1); // 25
  });
});


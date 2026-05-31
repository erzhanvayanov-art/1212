import { describe, it, expect } from 'vitest';
import { getUnique } from './collection06';

// 1. Тест для уникальных элементов
describe('getUnique', () => {
  it('should return array with unique elements', () => {
    expect(getUnique([1, 2, 2, 3, 4, 4, 4])).toEqual([1, 2, 3, 4]);
    expect(getUnique([5, 5, 5])).toEqual([5]);
  });
});

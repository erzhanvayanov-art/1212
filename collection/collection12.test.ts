import { describe, it, expect } from 'vitest';
import { cache } from './collection12';

describe('cache', () => {
  it('should cache function results', () => {
    let callCount = 0;
    const expensiveFn = (a: number, b: number) => {
      callCount++;
      return a + b;
    };
    
    const cachedFn = cache(expensiveFn);
    expect(cachedFn(2, 3)).toBe(5);
    expect(cachedFn(2, 3)).toBe(5); // Должен взять из кэша
    expect(callCount).toBe(1); // Функция вызвана только один раз
  });
});

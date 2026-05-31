import { describe, it, expect } from 'vitest';
import { sumProperty } from './collection22';

describe('sumProperty', () => {
  it('should sum values of specified property', () => {
    const items = [
      { price: 100, quantity: 2 },
      { price: 200, quantity: 1 },
      { price: 50, quantity: 3 }
    ];
    expect(sumProperty(items, 'price')).toBe(350);
    expect(sumProperty(items, 'quantity')).toBe(6);
  });

  it('should handle empty arrays', () => {
    expect(sumProperty([], 'price')).toBe(0);
  });
});
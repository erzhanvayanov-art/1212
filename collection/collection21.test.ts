import { describe, it, expect } from 'vitest';
import { getDiscountedInStockTotal } from './collection21';

describe('getDiscountedInStockTotal', () => {
  it('should calculate total of discounted in-stock items', () => {
    const cart = [
      { price: 1000, discount: true, inStock: true },
      { price: 500, discount: false, inStock: true },
      { price: 300, discount: true, inStock: false },
      { price: 200, discount: true, inStock: true }
    ];
    expect(getDiscountedInStockTotal(cart)).toBe(1200);
  });
});
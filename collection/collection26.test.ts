import { describe, it, expect } from 'vitest';
import { groupProductsByPrice } from './collection26';

describe('groupProductsByPrice', () => {
  it('should group products into price categories', () => {
    const products = [
      { name: 'Pen', price: 50 },
      { name: 'Book', price: 500 },
      { name: 'Laptop', price: 3000 },
      { name: 'Car', price: 10000 }
    ];
    const result = groupProductsByPrice(products);
    expect(result.cheap).toHaveLength(2);
    expect(result.medium).toHaveLength(1);
    expect(result.expensive).toHaveLength(1);
    expect(result.cheap.map(p => p.name)).toEqual(['Pen', 'Book']);
  });
});
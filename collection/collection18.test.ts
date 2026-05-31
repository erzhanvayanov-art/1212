import { describe, it, expect } from 'vitest';
import { getAffordableInStockProducts } from './collection18';

describe('getAffordableInStockProducts', () => {
  it('should return names of affordable in-stock products', () => {
    const products = [
      { name: 'Laptop', price: 2000, inStock: true },
      { name: 'Mouse', price: 500, inStock: true },
      { name: 'Keyboard', price: 800, inStock: false }
    ];
    expect(getAffordableInStockProducts(products)).toEqual(['Mouse']);
  });
});
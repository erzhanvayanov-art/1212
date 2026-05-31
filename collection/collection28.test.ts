import { describe, it, expect } from 'vitest';
import { getTopRatedInCategory } from './collection28';

describe('getTopRatedInCategory', () => {
  it('should return top 3 rated products in category', () => {
    const products = [
      { category: 'electronics', rating: 4.5, name: 'Phone' },
      { category: 'electronics', rating: 4.9, name: 'Laptop' },
      { category: 'books', rating: 4.8, name: 'Novel' },
      { category: 'electronics', rating: 4.7, name: 'Tablet' },
      { category: 'electronics', rating: 4.2, name: 'Headphones' }
    ];
    const result = getTopRatedInCategory(products, 'electronics');
    expect(result).toHaveLength(3);
    expect(result[0].name).toBe('Laptop');
    expect(result[1].name).toBe('Tablet');
    expect(result[2].name).toBe('Phone');
  });
});
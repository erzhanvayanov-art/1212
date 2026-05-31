import { describe, it, expect } from 'vitest';
import { groupByCategory } from './collection23';

describe('groupByCategory', () => {
  it('should group objects by category', () => {
    const products = [
      { name: 'Laptop', category: 'electronics' },
      { name: 'Phone', category: 'electronics' },
      { name: 'Book', category: 'education' },
      { name: 'Pen', category: 'education' }
    ];

    const result = groupByCategory(products, 'category');
    expect(result.electronics).toHaveLength(2);
    expect(result.education).toHaveLength(2);
    expect(result.electronics?.map(p => p.name)).toEqual(['Laptop', 'Phone']);
  });

  it('should handle empty arrays', () => {
    expect(groupByCategory([], 'category')).toEqual({});
  });
});
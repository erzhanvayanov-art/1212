import { describe, it, expect } from 'vitest';
import { getOrderStats } from './collection25';

describe('getOrderStats', () => {
  it('should return stats for completed orders only', () => {
    const orders = [
      { status: 'completed', amount: 1000 },
      { status: 'pending', amount: 2000 },
      { status: 'completed', amount: 1500 },
      { status: 'cancelled', amount: 500 }
    ];
    const result = getOrderStats(orders);
    expect(result.total).toBe(2500);
    expect(result.count).toBe(2);
  });
});

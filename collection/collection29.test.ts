import { describe, it, expect } from 'vitest';
import { calculateTotalProgress } from './collection29';

describe('calculateTotalProgress', () => {
  it('should calculate average progress of active users above 50%', () => {
    const users = [
      { active: true, progress: 75 },
      { active: false, progress: 90 },
      { active: true, progress: 30 },
      { active: true, progress: 85 }
    ];
    const result = calculateTotalProgress(users);
    expect(result).toBe(80); // (75 + 85) / 2
  });
});
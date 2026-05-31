import { describe, it, expect } from 'vitest';
import { findMostPopularTag } from './collection27';

describe('findMostPopularTag', () => {
  it('should count tag frequencies', () => {
    const posts = [
      { tags: ['js', 'web'] },
      { tags: ['js', 'backend'] },
      { tags: ['web', 'design'] }
    ];
    const result = findMostPopularTag(posts);
    expect(result.js).toBe(2);
    expect(result.web).toBe(2);
    expect(result.backend).toBe(1);
  });
});
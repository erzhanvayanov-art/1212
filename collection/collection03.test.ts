import { describe, it, expect } from 'vitest';
import { infiniteSequence } from './collection03';

describe('infiniteSequence', () => {
  it('should generate infinite sequence starting from 0', () => {
    const gen = infiniteSequence();
    expect(gen.next().value).toBe(0);
    expect(gen.next().value).toBe(1);
    expect(gen.next().value).toBe(2);
    expect(gen.next().value).toBe(3);
  });
});
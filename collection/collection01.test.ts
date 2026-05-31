import { describe, it, expect } from 'vitest';
import { numberGenerator } from './collection01';

describe('numberGenerator', () => {
  it('should generate numbers from 1 to max', () => {
    const gen = numberGenerator(3);
    expect(gen.next().value).toBe(1);
    expect(gen.next().value).toBe(2);
    expect(gen.next().value).toBe(3);
    expect(gen.next().done).toBe(true);
  });
});
import { describe, it, expect } from 'vitest';
import { addPrefix } from './collection15';

describe('addPrefix', () => {
  it('should add prefix to each item', () => {
    expect(addPrefix(['apple', 'banana'])).toEqual(['Item: apple', 'Item: banana']);
    expect(addPrefix([''])).toEqual(['Item: ']);
  });
});

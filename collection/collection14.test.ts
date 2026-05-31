import { describe, it, expect } from 'vitest';
import { getNames } from './collection14';

describe('getNames', () => {
  it('should extract names from user objects', () => {
    const users = [{name: 'Alice'}, {name: 'Bob'}, {name: 'Charlie'}];
    expect(getNames(users)).toEqual(['Alice', 'Bob', 'Charlie']);
  });
});
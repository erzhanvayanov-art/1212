import { test, expect } from 'vitest';
import { countBooks } from './serial25';
import { sampleXML } from './saxXML';

test('should count 2 book elements', () => {
  expect(countBooks(sampleXML)).toBe(2);
});
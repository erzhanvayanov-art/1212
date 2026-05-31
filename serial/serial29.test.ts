import { expect, test } from "vitest";
import { findBookById } from "./serial29";
import { sampleXML } from "./saxXML";

test('should find book by id', () => {
  expect(findBookById(sampleXML, '2')).toBe('Advanced TS');
  expect(findBookById(sampleXML, '999')).toBeNull();
});
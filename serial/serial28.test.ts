import { expect, test } from "vitest";
import { validateBookStructure } from "./serial28";
import { sampleXML } from "./saxXML";

test('should validate book structure', () => {
  const invalidXML = `<book><title>No ID</title></book>`;
  expect(validateBookStructure(sampleXML)).toBe(true);
  expect(validateBookStructure(invalidXML)).toBe(false);
});
import { expect, test } from "vitest";
import { parseSafely } from "./serial30";

test('should handle parsing errors', () => {
  const invalidXML = `<library><book></library>`;
  const result = parseSafely(invalidXML);
  expect(result.success).toBe(false);
  expect(result.error).toBeDefined();
});
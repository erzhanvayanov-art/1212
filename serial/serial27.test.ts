import { expect, test } from "vitest";import { extractTitles } from "./serial27";
import { sampleXML } from "./saxXML";

test("should extract book titles", () => {
  expect(extractTitles(sampleXML)).toEqual([
    "TypeScript Basics",
    "Advanced TS",
  ]);
});

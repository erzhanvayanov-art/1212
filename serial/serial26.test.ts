import { expect, test } from "vitest";
import { collectBookIds } from "./serial26";
import { sampleXML } from "./saxXML";

test("should collect book ids", () => {
  expect(collectBookIds(sampleXML)).toEqual(["1", "2"]);
});

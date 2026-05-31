import { describe, it, expect } from "vitest";
import { DOMParser } from "@xmldom/xmldom";
import { findErrorElements } from "./serial22";

describe("Find elements with error class", () => {
  const xml = `
    <form>
      <input class="error" value="Invalid input"/>
      <div class="error-message">This is an error</div>
      <span class="no-error">This is fine</span>
      <button class="btn error-btn">Submit</button>
      <p class="success">Success message</p>
      <div class="critical-error">Critical issue</div>
    </form>
  `;

  it('should find all elements with class containing "error"', () => {
    const doc = new DOMParser().parseFromString(xml, "text/xml");
    const elements = findErrorElements(doc);

    expect(elements).toHaveLength(5);
    expect(elements[0].getAttribute("class")).toBe("error");
    expect(elements[1].getAttribute("class")).toBe("error-message");
    expect(elements[2].getAttribute("class")).toBe("no-error");
    expect(elements[3].getAttribute("class")).toBe("btn error-btn");
    expect(elements[4].getAttribute("class")).toBe("critical-error");
  });  
});

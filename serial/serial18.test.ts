import { describe, it, expect } from 'vitest';
import { DOMParser } from '@xmldom/xmldom';
import { findElementsWithExactText } from './serial18';

describe('Find elements with exact text content', () => {
  const xml = `
    <form>
      <button>Submit</button>
      <span>Submit application</span>
      <div>Please Submit</div>
      <input value="Submit"/>
      <label>Submit</label>
    </form>
  `;

  it('should find elements with exact text "Submit"', () => {
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    const elements = findElementsWithExactText(doc);
    
    expect(elements).toHaveLength(2);
    expect(elements[0].textContent).toBe('Submit');
    expect(elements[1].textContent).toBe('Submit');
    expect(elements[0].nodeName).toBe('button');
    expect(elements[1].nodeName).toBe('label');
  });

  it('should not find partial matches', () => {
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    const elements = findElementsWithExactText(doc);
    
    // Не должны найти элементы с частичным совпадением
    const partialMatches = elements.filter(el => 
      el.textContent !== 'Submit'
    );
    expect(partialMatches).toHaveLength(0);
  });
});
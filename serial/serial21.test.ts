import { describe, it, expect } from 'vitest';
import { DOMParser } from '@xmldom/xmldom';
import { findDirectDivChildren } from './serial21';

describe('Find direct div children', () => {
  const xml = `
    <div id="container">
      <div>Direct child 1</div>
      <section>
        <div>Nested child 1</div>
        <div>Nested child 2</div>
      </section>
      <div>Direct child 2</div>
      <span>Not a div</span>
    </div>
  `;

  it('should find only direct div children of container', () => {
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    const divs = findDirectDivChildren(doc);
    
    expect(divs).toHaveLength(2);
    expect(divs[0].textContent).toBe('Direct child 1');
    expect(divs[1].textContent).toBe('Direct child 2');
  });

  it('should not find nested div elements', () => {
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    const divs = findDirectDivChildren(doc);
    
    const nestedDivs = divs.filter(div => 
      div.textContent === 'Nested child 1' || div.textContent === 'Nested child 2'
    );
    expect(nestedDivs).toHaveLength(0);
  });
});
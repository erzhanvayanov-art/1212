import { describe, it, expect } from 'vitest';
import { DOMParser } from '@xmldom/xmldom';
import { findAllTitleElements } from './serial15';

describe('Find all title elements', () => {
  const xml = `
    <library>
      <book>
        <title>JavaScript Basics</title>
      </book>
      <book>
        <title>TypeScript Advanced</title>
      </book>
      <magazine>
        <title>Tech Monthly</title>
      </magazine>
    </library>
  `;

  it('should find all title elements in the document', () => {
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    const titles = findAllTitleElements(doc);
    
    expect(titles).toHaveLength(3);
    expect(titles[0].textContent).toBe('JavaScript Basics');
    expect(titles[1].textContent).toBe('TypeScript Advanced');
    expect(titles[2].textContent).toBe('Tech Monthly');
  });

  it('should return empty array if no titles found', () => {
    const emptyXml = '<library><book></book></library>';
    const doc = new DOMParser().parseFromString(emptyXml, 'text/xml');
    const titles = findAllTitleElements(doc);
    
    expect(titles).toHaveLength(0);
  });
});
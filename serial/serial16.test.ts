// task-2.test.ts
import { describe, it, expect } from 'vitest';
import { DOMParser } from '@xmldom/xmldom';
import { findElementsWithIdAttribute } from './serial16';

describe('Find elements with id attribute', () => {
  const xml = `
    <div id="header">
      <span class="text">Hello</span>
      <p id="content">Content here</p>
      <a href="#" id="link1">Link 1</a>
      <button>Click</button>
      <input id="search" type="text"/>
    </div>
  `;

  it('should find all elements with id attribute', () => {
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    const elements = findElementsWithIdAttribute(doc);
    
    expect(elements).toHaveLength(4);
    expect(elements[0].nodeName).toBe('div');
    expect(elements[1].nodeName).toBe('p');
    expect(elements[2].nodeName).toBe('a');
    expect(elements[3].nodeName).toBe('input');
  });

  it('should verify id attribute values', () => {
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    const elements = findElementsWithIdAttribute(doc);
    
    expect(elements[0].getAttribute('id')).toBe('header');
    expect(elements[1].getAttribute('id')).toBe('content');
    expect(elements[2].getAttribute('id')).toBe('link1');
    expect(elements[3].getAttribute('id')).toBe('search');
  });
});
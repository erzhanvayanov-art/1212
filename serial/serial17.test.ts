import { describe, it, expect } from 'vitest';
import { DOMParser } from '@xmldom/xmldom';
import { findElementsWithExactClass } from './serial17';

describe('Find elements with exact class value', () => {
  const xml = `
    <nav>
      <a class="active">Home</a>
      <a class="inactive">About</a>
      <a class="active highlighted">Contact</a>
      <a>No class</a>
      <div class="active">Dashboard</div>
    </nav>
  `;

  it('should find only elements with exact class="active"', () => {
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    const elements = findElementsWithExactClass(doc);
    
    expect(elements).toHaveLength(2);
    expect(elements[0].textContent).toBe('Home');
    expect(elements[1].textContent).toBe('Dashboard');
  });

  it('should not find elements with multiple classes', () => {
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    const elements = findElementsWithExactClass(doc);
    
    // Элемент с class="active highlighted" не должен быть найден
    const contactElement = elements.find(el => el.textContent === 'Contact');
    expect(contactElement).toBeUndefined();
  });
});
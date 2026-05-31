import { describe, it, expect } from 'vitest';
import { DOMParser } from '@xmldom/xmldom';
import { findPrimaryButtons } from './serial19';

describe('Find primary buttons', () => {
  const xml = `
    <div>
      <button class="primary">Save</button>
      <button class="secondary">Cancel</button>
      <a class="primary">Not a button</a>
      <button class="primary disabled">Delete</button>
      <button>No class</button>
    </div>
  `;

  it('should find only button elements with class="primary"', () => {
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    const buttons = findPrimaryButtons(doc);
    
    expect(buttons).toHaveLength(2);
    expect(buttons[0].textContent).toBe('Save');
    expect(buttons[1].textContent).toBe('Delete');
    expect(buttons[0].nodeName).toBe('button');
    expect(buttons[1].nodeName).toBe('button');
  });

  it('should not find non-button elements with primary class', () => {
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    const buttons = findPrimaryButtons(doc);
    
    const linkElement = buttons.find(el => el.nodeName === 'a');
    expect(linkElement).toBeUndefined();
  });
});
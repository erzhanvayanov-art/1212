import { describe, it, expect } from 'vitest';
import { DOMParser } from '@xmldom/xmldom';
import { findMenuListItems } from './serial20';

describe('Find menu list items', () => {
  const xml = `
    <nav>
      <ul class="menu">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <ul class="sidebar">
        <li>Recent</li>
        <li>Popular</li>
      </ul>
      <ol class="menu">
        <li>Step 1</li>
        <li>Step 2</li>
      </ol>
    </nav>
  `;

  it('should find only li elements in ul.menu', () => {
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    const items = findMenuListItems(doc);
    
    expect(items).toHaveLength(3);
    expect(items[0].textContent).toBe('Home');
    expect(items[1].textContent).toBe('About');
    expect(items[2].textContent).toBe('Contact');
  });

  it('should not find items from other lists', () => {
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    const items = findMenuListItems(doc);
    
    const sidebarItems = items.filter(item => 
      item.textContent === 'Recent' || item.textContent === 'Popular'
    );
    const orderedListItems = items.filter(item =>
      item.textContent === 'Step 1' || item.textContent === 'Step 2'
    );
    
    expect(sidebarItems).toHaveLength(0);
    expect(orderedListItems).toHaveLength(0);
  });
});
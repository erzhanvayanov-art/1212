import { describe, it, expect } from 'vitest';
import { DOMParser } from '@xmldom/xmldom';
import { findFirstParagraph } from './serial23';

describe('Find first paragraph', () => {
  const xml = `
    <article>
      <h1>Main Title</h1>
      <p>First paragraph text</p>
      <p>Second paragraph text</p>
      <section>
        <p>Nested paragraph</p>
        <div>Some content</div>
      </section>
      <p>Third paragraph</p>
    </article>
  `;

  it('should find the very first paragraph in document', () => {
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    const paragraph = findFirstParagraph(doc);
    
    expect(paragraph).not.toBeNull();
    expect(paragraph?.textContent).toBe('First paragraph text');
    expect(paragraph?.nodeName).toBe('p');
  });

  it('should return null when no paragraphs exist', () => {
    const noParagraphsXml = `
      <article>
        <h1>Title</h1>
        <div>Content</div>
        <span>Text</span>
      </article>
    `;
    
    const doc = new DOMParser().parseFromString(noParagraphsXml, 'text/xml');
    const paragraph = findFirstParagraph(doc);
    
    expect(paragraph).toBeNull();
  });

  it('should find first paragraph even when nested', () => {
    const nestedXml = `
      <div>
        <section>
          <p>Deeply nested paragraph</p>
        </section>
        <p>Another paragraph</p>
      </div>
    `;
    
    const doc = new DOMParser().parseFromString(nestedXml, 'text/xml');
    const paragraph = findFirstParagraph(doc);
    
    expect(paragraph?.textContent).toBe('Deeply nested paragraph');
  });

  it('should handle empty documents', () => {
    const emptyXml = '<root></root>';
    const doc = new DOMParser().parseFromString(emptyXml, 'text/xml');
    const paragraph = findFirstParagraph(doc);
    
    expect(paragraph).toBeNull();
  });
});
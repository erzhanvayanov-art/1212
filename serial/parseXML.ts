import { DOMParser } from '@xmldom/xmldom';

export function parseXml(xmlString: string): Document {
  const parser = new DOMParser();
  return parser.parseFromString(xmlString, 'text/xml');
}
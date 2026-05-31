/* 
  Найти все элементы, имеющие атрибут id
*/

import { select } from 'xpath';

export function findElementsWithIdAttribute(doc: Document): Node[] {
  const query = "//*[@id]" 	// XPath запрос для поиска всех элементов с атрибутом id
  return select(query, doc) as Node[];
}
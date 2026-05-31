/* 
  Найти первый элемент <p> в документе.
*/

import { select } from 'xpath';

export function findFirstParagraph(doc: Document): Node | null {
  const query = "(//p)[1]"; // XPath запрос для поиска первого элемента p
  const result = select(query, doc) as Node[];
  return result.length > 0 ? result[0] : null;
}
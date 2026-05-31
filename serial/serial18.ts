/* 	
  Найти все элементы с текстом "Submit".
*/

import { select } from "xpath";

export function findElementsWithExactText(doc: Document): Node[] {
  const query = "//*[text()='Submit']"; // XPath запрос для поиска элементов с точным текстом "Submit"
  return select(query, doc) as Node[];
}
/* 	
  Найти только прямые потомки <div> у элемента с id="container".
*/

import { select } from "xpath";

export function findDirectDivChildren(doc: Document): Node[] {
  const query = "//*[@id='container']/div";
  return select(query, doc) as Node[];
}
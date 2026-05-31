/* 	
  Найти все элементы с атрибутом data-type="user" И классом online.
*/

import { select } from "xpath";

export function findOnlineUsers(doc: Document): Node[] {
  const query = "//*[@data-type='user' and contains(concat(' ', normalize-space(@class), ' '), ' online ')]";
  return select(query, doc) as Node[];
}
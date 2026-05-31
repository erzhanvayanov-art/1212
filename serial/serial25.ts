/* 	
  Дан код, который должен подсчитывать общее количество тегов <book>. Завершите реализацию функции countBooks.
  Пример XML в файле saxXML.ts
*/

import { SAXParser } from "sax";

// Исходный код
export function countBooks(xml: string): number {
  const parser = new SAXParser(true);
  let count = 0;

  // Добавляем обработчик события открытия тега
  parser.onopentag = (tag) => {
    if (tag.name === 'book') {
      count++;
    }
  };

  parser.write(xml).close();
  return count;
}
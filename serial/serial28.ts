/* 	
  Проверьте, что каждый тег <book> имеет атрибут id.
  Пример XML в файле saxXML.ts
*/

import { SAXParser } from "sax";

// Исходный код
export function validateBookStructure(xml: string): boolean {
  const parser = new SAXParser(true);
  let isValid = true;

  // Если встречается тег 'book' без атрибута 'id', установите isValid = false
  parser.onopentag = (tag) => {
    if (tag.name === 'book' && !tag.attributes.id) {
      isValid = false;
    }
  };

  // Добавляем обработчик ошибок, чтобы не падать на синтаксических ошибках
  parser.onerror = (err) => {
    // Если ошибка парсинга, считаем структуру невалидной
    isValid = false;
  };

  try {
    parser.write(xml).close();
  } catch (e) {
    return false;
  }

  return isValid;
}
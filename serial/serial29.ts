/* 
  Найдите книгу с ID=2 и верните её название.
  Пример XML в файле saxXML.ts
*/

import { SAXParser, type QualifiedAttribute } from "sax";

export function findBookById(xml: string, targetId: string): string | null {
  const parser = new SAXParser(true);
  let currentId: string = '';
  let currentTitle = '';
  let foundBook = false;
  let isTitleTag = false;

  // Реализуем логику поиска книги по ID и извлечения её названия
  parser.onopentag = (tag) => {
    if (tag.name === 'book') {
      // Получаем id книги
      currentId = tag.attributes.id as string;
      // Если ID совпадает с искомым, отмечаем что книгу нашли
      if (currentId === targetId) {
        foundBook = true;
      } else {
        foundBook = false;
      }
      // Сбрасываем текущее название при открытии новой книги
      currentTitle = '';
    }

    // Если мы внутри нужной книги и открыли тег title
    if (foundBook && tag.name === 'title') {
      isTitleTag = true;
    }
  };

  parser.ontext = (text) => {
    // Если внутри тега title у нужной книги, добавляем текст
    if (foundBook && isTitleTag) {
      currentTitle += text;
    }
  };

  parser.onclosetag = (tagName) => {
    // При закрытии тега title выключаем флаг
    if (tagName === 'title') {
      isTitleTag = false;
    }
  };

  parser.write(xml).close();
  return foundBook ? currentTitle.trim() : null;
}
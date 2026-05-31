/* 	
  Соберите все названия книг в массив.
  Пример XML в файле saxXML.ts
*/

import { SAXParser } from "sax";

export function extractTitles(xml: string): string[] {
  const parser = new SAXParser(true);
  const titles: string[] = [];
  let currentTitle = "";
  let isTitleTag = false;

  // Обработчик открытия тега
  parser.onopentag = (tag) => {
    if (tag.name === 'title') {
      isTitleTag = true;
      currentTitle = "";
    }
  };

  // Обработчик текстового содержимого
  parser.ontext = (text) => {
    if (isTitleTag) {
      currentTitle += text;
    }
  };

  // Обработчик закрытия тега
  parser.onclosetag = (tagName) => {
    if (tagName === 'title' && isTitleTag) {
      titles.push(currentTitle);
      isTitleTag = false;
      currentTitle = "";
    }
  };

  parser.write(xml).close();
  return titles;
}
/* 
  Добавьте обработку ошибок для невалидного XML.
*/

import { SAXParser } from "sax";

// Исходный код
export function parseSafely(xml: string): { success: boolean; error?: string } {
  const parser = new SAXParser(true);
  const result = { success: true, error: undefined as string | undefined };

  // Добавляем обработчик ошибок, который установит success = false и сохранит сообщение об ошибке
  parser.onerror = (err) => {
    result.success = false;
    result.error = err.message;
  };

  try {
    parser.write(xml).close();
  } catch (e) {
    result.success = false;
    result.error = e instanceof Error ? e.message : String(e);
  }
  return result;
}
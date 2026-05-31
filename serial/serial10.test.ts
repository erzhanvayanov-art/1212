import { expect, test } from 'vitest';
import { parseXml } from './parseXML';
import { findProductsInCategory } from './serial10';

test('находит товары в категории electronics', () => {
  const xml = parseXml(`
    <categories>
      <category name="electronics">
        <products>
          <product id="1" name="Laptop"/>
          <product id="2" name="Phone"/>
        </products>
      </category>
      <category name="books">
        <products>
          <product id="3" name="Novel"/>
        </products>
      </category>
    </categories>
  `);
  
  const products = findProductsInCategory(xml, 'electronics');
  expect(products).toHaveLength(2);
  expect(products[0].getAttribute('id')).toBe('1');
  expect(products[0].getAttribute('name')).toBe('Laptop');
  expect(products[1].getAttribute('id')).toBe('2');
  expect(products[1].getAttribute('name')).toBe('Phone');
});

test('возвращает пустой массив для несуществующей категории', () => {
  const xml = parseXml(`<categories><category name="electronics"><products><product/></products></category></categories>`);
  expect(findProductsInCategory(xml, 'nonexistent')).toEqual([]);
});

test('обрабатывает категории без товаров', () => {
  const xml = parseXml(`<categories><category name="empty"><products></products></category></categories>`);
  expect(findProductsInCategory(xml, 'empty')).toEqual([]);
});

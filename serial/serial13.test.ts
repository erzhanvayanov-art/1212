import { expect, test } from 'vitest';
import { parseXml } from './parseXML';
import { calculateOrderTotal } from './serial13';

test('рассчитывает общую стоимость для сложного заказа', () => {
  const xml = parseXml(`
    <order id="123">
      <items>
        <item productId="1" price="100" quantity="2"/>
        <item productId="2" price="50" quantity="3"/>
        <item productId="3" price="200" quantity="1"/>
        <item productId="4" price="75" quantity="4"/>
      </items>
    </order>
  `);
  
  const total = calculateOrderTotal(xml);
  // 100*2 + 50*3 + 200*1 + 75*4 = 200 + 150 + 200 + 300 = 850
  expect(total).toBe(850);
});

test('обрабатывает заказ без items', () => {
  const xml = parseXml(`<order id="123"></order>`);
  expect(calculateOrderTotal(xml)).toBe(0);
});

test('обрабатывает items без атрибутов price и quantity', () => {
  const xml = parseXml(`
    <order>
      <items>
        <item productId="1"/>
        <item productId="2" price="100"/>
        <item productId="3" quantity="2"/>
        <item productId="4" price="50" quantity="3"/>
      </items>
    </order>
  `);
  
  expect(calculateOrderTotal(xml)).toBe(150); // только последний item считается
});

test('работает с дробными ценами', () => {
  const xml = parseXml(`
    <order>
      <items>
        <item price="99.99" quantity="2"/>
      </items>
    </order>
  `);
  
  expect(calculateOrderTotal(xml)).toBe(199.98);
});
import { expect, test } from 'vitest';
import { parseXml } from './parseXML';
import { findOrdersByStatus } from './serial12';

test('находит заказы по разным статусам', () => {
  const xml = parseXml(`
    <orders>
      <order id="1" status="completed">
        <items>
          <item productId="101" quantity="2"/>
        </items>
      </order>
      <order id="2" status="pending">
        <items>
          <item productId="102" quantity="1"/>
        </items>
      </order>
      <order id="3" status="completed">
        <items>
          <item productId="103" quantity="3"/>
        </items>
      </order>
      <order id="4" status="cancelled">
        <items>
          <item productId="104" quantity="1"/>
        </items>
      </order>
    </orders>
  `);
  
  const completedOrders = findOrdersByStatus(xml, 'completed');
  const pendingOrders = findOrdersByStatus(xml, 'pending');
  const cancelledOrders = findOrdersByStatus(xml, 'cancelled');
  const nonexistentOrders = findOrdersByStatus(xml, 'nonexistent');
  
  expect(completedOrders).toHaveLength(2);
  expect(completedOrders[0].getAttribute('id')).toBe('1');
  expect(completedOrders[1].getAttribute('id')).toBe('3');
  
  expect(pendingOrders).toHaveLength(1);
  expect(pendingOrders[0].getAttribute('id')).toBe('2');
  
  expect(cancelledOrders).toHaveLength(1);
  expect(cancelledOrders[0].getAttribute('id')).toBe('4');
  
  expect(nonexistentOrders).toEqual([]);
});

test('проверяет структуру найденных заказов', () => {
  const xml = parseXml(`<orders><order id="123" status="completed"><items><item/></items></order></orders>`);
  const orders = findOrdersByStatus(xml, 'completed');
  
  expect(orders[0].getAttribute('id')).toBe('123');
  expect(orders[0].getAttribute('status')).toBe('completed');
  expect(orders[0].getElementsByTagName('items')).toHaveLength(1);
});
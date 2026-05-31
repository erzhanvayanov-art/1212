import { test, expect } from 'vitest';
import { plainToInstance } from 'class-transformer';
import { Order } from './serial01';
import { User } from './user';

test('Order with nested User', () => {
  const data = '{"id":1,"product":"Book","customer":{"firstName":"Emma","lastName":"Watson"}}';
  const order = plainToInstance(Order, JSON.parse(data) as Order);
  
  expect(order.getOrderInfo()).toBe('Order #1 by Emma Watson');
  expect(order.customer).toBeInstanceOf(User);
});
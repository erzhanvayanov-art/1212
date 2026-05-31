import { plainToInstance } from 'class-transformer';
import { expect, test } from 'vitest';
import { Employee } from './serial06';
import { User } from './user';

test('Employee with optional manager', () => {
  const data = '{"name":"John","manager":{"firstName":"Alice","lastName":"Smith"}}';
  const employee = plainToInstance(Employee, JSON.parse(data) as Employee);
  
  expect(employee.manager?.getFullName()).toBe('Alice Smith');
  expect(employee.manager).toBeInstanceOf(User);
  
  const data2 = '{"name":"John","manager":null}';
  const employee2 = plainToInstance(Employee, JSON.parse(data2) as Employee);
  
  expect(employee2.manager).toBe(null);
});
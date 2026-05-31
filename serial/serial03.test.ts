import { plainToInstance } from 'class-transformer';
import { expect, test } from 'vitest';
import { Company } from './serial03';
import { User } from './user';

test('Company with deep nesting', () => {
  const data = '{"name":"TechCorp","departments":[{"name":"Dev","employees":[{"firstName":"John","lastName":"Doe"}]}]}';
  const company = plainToInstance(Company, JSON.parse(data) as Company);
  
  expect(company.departments[0].employees[0].getFullName()).toBe('John Doe');
  expect(company.departments[0].employees[0]).toBeInstanceOf(User);
});
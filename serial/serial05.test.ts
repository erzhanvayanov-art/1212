import { plainToInstance } from 'class-transformer';
import { expect, test } from 'vitest';
import { Session } from './serial05';

test('Session with Date transformation', () => {
  const data = '{"user":{"firstName":"Kate","lastName":"Wilson"},"loginAt":"2023-10-05T12:00:00Z"}';
  const session = plainToInstance(Session, JSON.parse(data) as Session);
  
  expect(session.loginAt).toBeInstanceOf(Date);
  expect(session.loginAt.getFullYear()).toBe(2023);
});
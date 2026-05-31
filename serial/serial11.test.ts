import { expect, test } from 'vitest';
import { parseXml } from './parseXML';
import { getAllUserEmails } from './serial11';

test('собирает все email пользователей из сложной структуры', () => {
  const xml = parseXml(`
    <users>
      <user id="1">
        <personalInfo>
          <email>alice@example.com</email>
          <phone>+123456789</phone>
        </personalInfo>
      </user>
      <user id="2">
        <personalInfo>
          <email>bob@example.com</email>
          <phone>+987654321</phone>
        </personalInfo>
      </user>
      <user id="3">
        <personalInfo>
          <email>charlie@example.com</email>
        </personalInfo>
      </user>
    </users>
  `);
  
  const emails = getAllUserEmails(xml);
  expect(emails).toEqual([
    'alice@example.com',
    'bob@example.com',
    'charlie@example.com'
  ]);
  expect(emails).toHaveLength(3);
});

test('возвращает пустой массив при отсутствии пользователей', () => {
  const xml = parseXml(`<users></users>`);
  expect(getAllUserEmails(xml)).toEqual([]);
});
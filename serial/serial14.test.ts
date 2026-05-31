import { expect, test } from 'vitest';
import { parseXml } from './parseXML';
import { findUsersWithRole } from './serial14';

test('находит пользователей с разными ролями', () => {
  const xml = parseXml(`
    <users>
      <user id="1">
        <profile>
          <personal>
            <roles>
              <role>admin</role>
              <role>moderator</role>
            </roles>
          </personal>
        </profile>
      </user>
      <user id="2">
        <profile>
          <personal>
            <roles>
              <role>user</role>
              <role>moderator</role>
            </roles>
          </personal>
        </profile>
      </user>
      <user id="3">
        <profile>
          <personal>
            <roles>
              <role>user</role>
            </roles>
          </personal>
        </profile>
      </user>
      <user id="4">
        <profile>
          <personal>
            <roles>
              <role>admin</role>
              <role>user</role>
            </roles>
          </personal>
        </profile>
      </user>
    </users>
  `);
  
  const adminUsers = findUsersWithRole(xml, 'admin');
  const moderatorUsers = findUsersWithRole(xml, 'moderator');
  const userUsers = findUsersWithRole(xml, 'user');
  const nonexistentRoleUsers = findUsersWithRole(xml, 'nonexistent');
  
  expect(adminUsers).toHaveLength(2);
  expect(adminUsers[0].getAttribute('id')).toBe('1');
  expect(adminUsers[1].getAttribute('id')).toBe('4');
  
  expect(moderatorUsers).toHaveLength(2);
  expect(userUsers).toHaveLength(3);
  expect(nonexistentRoleUsers).toEqual([]);
});

test('обрабатывает пользователей без ролей', () => {
  const xml = parseXml(`
    <users>
      <user id="1">
        <profile>
          <personal>
            <roles></roles>
          </personal>
        </profile>
      </user>
      <user id="2">
        <profile>
          <personal>
            <!-- нет тега roles -->
          </personal>
        </profile>
      </user>
    </users>
  `);
  
  expect(findUsersWithRole(xml, 'admin')).toEqual([]);
});

test('учитывает регистр при поиске ролей', () => {
  const xml = parseXml(`
    <users>
      <user>
        <profile>
          <personal>
            <roles>
              <role>Admin</role>
              <role>ADMIN</role>
              <role>admin</role>
            </roles>
          </personal>
        </profile>
      </user>
    </users>
  `);
  
  expect(findUsersWithRole(xml, 'admin')).toHaveLength(1);
  expect(findUsersWithRole(xml, 'Admin')).toHaveLength(1);
});
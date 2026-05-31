import { describe, it, expect } from 'vitest';
import { DOMParser } from '@xmldom/xmldom';
import { findOnlineUsers } from './serial24';

describe('Find online users', () => {
  const xml = `
    <div>
      <span data-type="user" class="online">User1 (online)</span>
      <span data-type="user" class="offline">User2 (offline)</span>
      <span data-type="group" class="online">Group1 (online)</span>
      <span data-type="user" class="online busy">User3 (online busy)</span>
      <span class="online">No type specified</span>
      <span data-type="user">No class specified</span>
      <div data-type="user" class="online">User4 (online div)</div>
      <span data-type="user" class="online-notification">Should not match</span>
    </div>
  `;

  it('should find only elements with data-type="user" and online class', () => {
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    const users = findOnlineUsers(doc);
    
    expect(users).toHaveLength(3);
    expect(users[0].textContent).toBe('User1 (online)');
    expect(users[1].textContent).toBe('User3 (online busy)');
    expect(users[2].textContent).toBe('User4 (online div)');
  });

  it('should not find offline users', () => {
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    const users = findOnlineUsers(doc);
    
    const offlineUser = users.find(user => 
      user.textContent?.includes('offline')
    );
    expect(offlineUser).toBeUndefined();
  });

  it('should not find groups with online class', () => {
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    const users = findOnlineUsers(doc);
    
    const group = users.find(user => 
      user.textContent?.includes('Group')
    );
    expect(group).toBeUndefined();
  });

  it('should not find elements without data-type', () => {
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    const users = findOnlineUsers(doc);
    
    const noType = users.find(user => 
      !user.hasAttribute('data-type')
    );
    expect(noType).toBeUndefined();
  });

  it('should not find elements with partial class matches', () => {
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    const users = findOnlineUsers(doc);
    
    const partialMatch = users.find(user => 
      user.getAttribute('class') === 'online-notification'
    );
    expect(partialMatch).toBeUndefined();
  });

  it('should handle empty results', () => {
    const noUsersXml = `
      <div>
        <span data-type="group" class="online">Group</span>
        <span class="offline">User</span>
      </div>
    `;
    
    const doc = new DOMParser().parseFromString(noUsersXml, 'text/xml');
    const users = findOnlineUsers(doc);
    
    expect(users).toHaveLength(0);
  });

  it('should handle complex class combinations', () => {
    const complexXml = `
      <div>
        <span data-type="user" class="online">Simple</span>
        <span data-type="user" class="btn online">Prefix</span>
        <span data-type="user" class="online active">Suffix</span>
        <span data-type="user" class="status online busy">Middle</span>
        <span data-type="user" class="online-notification">Should not match</span>
      </div>
    `;
    
    const doc = new DOMParser().parseFromString(complexXml, 'text/xml');
    const users = findOnlineUsers(doc);
    
    expect(users).toHaveLength(4);
    expect(users[0].textContent).toBe('Simple');
    expect(users[1].textContent).toBe('Prefix');
    expect(users[2].textContent).toBe('Suffix');
    expect(users[3].textContent).toBe('Middle');
  });
});
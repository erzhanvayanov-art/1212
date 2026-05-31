import { describe, it, expect } from 'vitest';
import { getVerifiedAdultEmails } from './collection30';

describe('getVerifiedAdultEmails', () => {
  it('should return valid emails of verified adults', () => {
    const users = [
      { email: 'alice@mail.com', verified: true, age: 25 },
      { email: 'bob@mail.com', verified: false, age: 30 },
      { email: 'charlie', verified: true, age: 17 },
      { email: 'david@mail.com', verified: true, age: 20 }
    ];
    const result = getVerifiedAdultEmails(users);
    expect(result).toEqual(['alice@mail.com', 'david@mail.com']);
  });
});
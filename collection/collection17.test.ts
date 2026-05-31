import { describe, it, expect } from 'vitest';
import { getVerifiedEmails } from './collection17';

describe('getVerifiedEmails', () => {
  it('should return emails of verified users only', () => {
    const users = [
      { email: 'alice@mail.com', verified: true },
      { email: 'bob@mail.com', verified: false },
      { email: 'charlie@mail.com', verified: true }
    ];
    expect(getVerifiedEmails(users)).toEqual(['alice@mail.com', 'charlie@mail.com']);
  });
});
/**
 * @jest-environment node
 */

import type { SqlContext } from '@/lib/sql-context';
import { getUserData } from '@/app/actions/userDataActions';
import { newSqlMock } from '__tests__/__helpers__/mock-sql';

let sql: SqlContext;
jest.mock('@/lib/sql', () => ({
  executeSql: jest.fn((fn) => fn(sql)),
}));

beforeEach(async () => {
  sql = await newSqlMock();
});

describe('user data actions', () => {
  describe('get', () => {
    it('returns user data', async () => {
      const x = await getUserData({
        userId: 'charlie@example.com',
        name: 'bar',
        email: 'baz',
      });
      expect(x).not.toBeNull();
    });
  });
});

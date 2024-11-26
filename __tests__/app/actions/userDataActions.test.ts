/**
 * @jest-environment node
 */

import type { SqlContext } from '@/lib/sql-context';
import { addNotification, getUserData } from '@/app/actions/userDataActions';
import { newSqlMock, testID } from '__tests__/__helpers__/mock-sql';
import { executeSql } from '@/lib/sql';
import { revalidateTag } from 'next/cache';
import { ValueAs } from '@/lib/sql-format';

let sql: SqlContext;
jest.mock('@/lib/sql', () => ({
  executeSql: jest.fn((fn) => fn(sql)),
}));

beforeEach(async () => {
  sql = await newSqlMock();
});

jest.mock('next/cache', () => ({
  revalidateTag() {}, // noop
}));

describe('user data actions', () => {
  describe('get', () => {
    it('returns user data', async () => {
      const x = await getUserData({
        userId: testID.user.Charlie.value,
        name: 'bar',
        email: 'baz',
      });
      expect(x).not.toBeNull();
    });
  });

  describe('enable notifications', () => {
    it('works', async () => {
      // Add a notification
      expect(
        await addNotification(testID.user.Alice.value, 'my_player_updates'),
      ).toBe(true);
      expect(await enabledNotifications(testID.user.Alice)).toHaveLength(1);

      // Add the same notification
      expect(
        await addNotification(testID.user.Alice.value, 'my_player_updates'),
      ).toBe(true);
      expect(await enabledNotifications(testID.user.Alice)).toHaveLength(1);

      // Add all notifications
      expect(await addNotification(testID.user.Alice.value, 'All')).toBe(true);
      expect(await enabledNotifications(testID.user.Alice)).toHaveLength(4);
    });
  });
});

async function enabledNotifications(amplify_id: ValueAs) {
  const { rows } = await executeSql(
    (c) => c.query`
    SELECT type_id_notification_types
    FROM many_users_has_many_notification_types
    WHERE user_id_users = ${testID.user.Alice}
  `,
  );
  return rows;
}

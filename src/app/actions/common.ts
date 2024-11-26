import { SqlContext } from '@/lib/sql-context';

export async function getUserID(
  db: SqlContext,
  amplifyId: string,
): Promise<string> {
  const {
    rows: [{ user_id: userId } = {}],
  } = await db.query`
    SELECT user_id
    FROM   users u
    WHERE  amplify_id = ${amplifyId}`;
  if (userId === undefined) {
    throw new Error(`Error: user with amplify_id ${amplifyId} is missing`);
  }
  return userId;
}

export async function getNotificationID(
  db: SqlContext,
  name: string,
): Promise<string> {
  const {
    rows: [{ type_id: noteId } = {}],
  } = await db.query`
    SELECT type_id
    FROM   notification_types nt
    WHERE  name = ${name}`;
  if (noteId === undefined) {
    throw new Error(`Error: notification type ${name} is missing`);
  }
  return noteId;
}

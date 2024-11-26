import type { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createFunction(
    'missing_notifications',
    [{ name: 'user_id', type: 'uuid' }],
    { returns: 'TABLE (type_id uuid, name text)', language: 'plpgsql' },
    `
    #variable_conflict use_variable
    BEGIN

    RETURN QUERY
    SELECT n.type_id, n.name
    FROM notification_types n
    WHERE n.type_id NOT IN (
      SELECT un.type_id_notification_types
      FROM many_users_has_many_notification_types un
      INNER JOIN users u
        ON un.user_id_users = u.user_id
      WHERE u.user_id = user_id
    );

    END`,
  );

  pgm.createFunction(
    'enable_notifications',
    [
      {
        name: 'user_id',
        type: 'uuid',
      },
      {
        name: 'type_ids',
        type: 'uuid[]',
      },
    ],
    { language: 'plpgsql', returns: 'void' },
    `
    DECLARE
      type_id uuid;
    BEGIN

    FOREACH type_id IN ARRAY type_ids LOOP
      INSERT INTO many_users_has_many_notification_types (user_id_users, type_id_notification_types)
      VALUES (user_id, type_id)
      ON CONFLICT (user_id_users, type_id_notification_types) DO NOTHING;
    END LOOP;

    END`,
  );
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropFunction('missing_notifications', [
    { name: 'user_id', type: 'uuid' },
  ]);

  pgm.dropFunction('enable_notifications', [{ name: 'user_id', type: 'uuid' }]);
}

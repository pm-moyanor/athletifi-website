import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

// Always delete shorthands until we figure out what it does:
// export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.addColumn('player_identities', {
    player_email: {
      type: 'character varying(255)',
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropColumn('player_identities', 'player_email');
}

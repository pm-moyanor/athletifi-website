import type {
  Client,
  FieldDef,
  QueryArrayConfig,
  QueryArrayResult,
  QueryConfig,
  QueryResult,
  QueryResultRow,
  Submittable,
} from 'pg';
import type { PGlite, Results } from '@electric-sql/pglite';

import buildSchema from 'node-pg-migrate';
import config from '../../pgmconfig.json';
import { SqlContext, SqlContextBase, SqlResult } from '@/lib/sql-context';

export async function newSqlMock() {
  if ('window' in global) {
    throw new Error(
      'executeSql cannot be used in a browser. If this test should run in a server-side context, set @jest-environment node.',
    );
  }

  // Import pglite dynamically so we can throw a more friendly error if we're
  // called in a jsdom test
  const { PGlite } = await import('@electric-sql/pglite');
  const sql = new SqlContextImpl(new PGlite());

  // Disable console messages
  const origInfo = console.info;
  console.info = () => {};

  try {
    // Build the schema
    await buildSchema({
      dbClient: sql.client,
      dir: config['migrations-dir'],
      migrationsTable: config['migrations-table'],
      direction: 'up',
      createSchema: true,
      createMigrationsSchema: true,
    });

    // Insert test data
    await insertTestingRecords(sql);

    return sql;
  } finally {
    console.info = origInfo;
  }
}

async function insertTestingRecords(sql: SqlContext) {
  const id = (type: number, id: number) => {
    if (!type && !id) throw new Error('placeholder!');
    return `00000000-0000-0000-${`${type}`.padStart(4, '0')}-${`${id}`.padStart(12, '0')}`;
  };

  const uAlice = id(0, 1);
  const uBob = id(0, 2);
  const uCharlie = id(0, 3);
  await sql.insert(
    'users',
    {
      user_id: uAlice,
      name: 'Alice',
      email: 'alice@example.com',
      amplify_id: 'alice@example.com',
    },
    {
      user_id: uBob,
      name: 'Bob',
      email: 'bob@example.com',
      amplify_id: 'bob@example.com',
    },
    {
      user_id: uCharlie,
      name: 'Charlie',
      email: 'charlie@example.com',
      amplify_id: 'charlie@example.com',
    },
  );

  const theCoach = id(1, 1);
  await sql.insert('coaches', {
    coach_id: theCoach,
    first_name: 'Daniel',
  });

  const piBob = id(2, 2);
  await sql.insert('player_identities', {
    id: piBob,
  });

  const theClub = id(3, 1);
  await sql.insert('clubs', {
    club_id: theClub,
    name: 'The Club',
    location: 'That Place',
  });

  const theLeague = id(4, 1);
  await sql.insert('league', {
    league_id: theLeague,
  });

  const theTeam = id(5, 1);
  await sql.insert('teams', {
    team_id: theTeam,
    club: theClub,
    league: theLeague,
    head_coach: theCoach,
  });

  const ptiBob = id(6, 2);
  await sql.insert('players_team_info', {
    player_id: ptiBob,
    club_id: theClub,
    team_id: theTeam,
    player_identity: piBob,
  });

  const theCompetition = id(7, 1);
  await sql.insert('competitions', {
    competition_id: theCompetition,
    name: 'The Competition',
    league: theLeague,
  });

  const pciBob = id(8, 2);
  await sql.insert('player_card_images', {
    card_image_id: pciBob,
    player_id: ptiBob,
    competition_id: theCompetition,
    owner: uAlice,
  });

  await sql.insert('invitations', {
    guest: uCharlie,
    guest_email: 'charlie@example.com',
    card: pciBob,
  });
}

/**
 * A {@link SqlContext} implementation using pg-mem.
 */
class SqlContextImpl extends SqlContextBase {
  readonly #db;
  readonly client: Client;
  log = false;

  constructor(db: PGlite) {
    super();
    this.#db = db;
    this.client = new PgmClient(this.#db) as unknown as Client;
  }

  protected _query<R extends Record<string, any> = never>(
    text: string,
    values: any[],
  ): Promise<SqlResult<R>> {
    if (this.log) {
      console.log(text, values);
    }
    return this.#db.query(text, values);
  }
}

/**
 * Convert between PGlite.query and Client.query.
 */
class PgmClient implements Pick<Client, 'query'> {
  readonly #db: PGlite;

  constructor(db: PGlite) {
    this.#db = db;
  }

  query<T extends Submittable>(queryStream: T): T;
  query<R extends any[] = any[], I extends any[] = any[]>(
    queryConfig: QueryArrayConfig<I>,
    values?: I,
  ): Promise<QueryArrayResult<R>>;
  query<R extends QueryResultRow = any, I extends any[] = any[]>(
    queryConfig: QueryConfig<I>,
  ): Promise<QueryResult<R>>;
  query<R extends QueryResultRow = any, I extends any[] = any[]>(
    queryTextOrConfig: string | QueryConfig<I>,
    values?: I,
  ): Promise<QueryResult<R>>;
  query<R extends any[] = any[], I extends any[] = any[]>(
    queryConfig: QueryArrayConfig<I>,
    callback: (err: Error, result: QueryArrayResult<R>) => void,
  ): void;
  query<R extends QueryResultRow = any, I extends any[] = any[]>(
    queryTextOrConfig: string | QueryConfig<I>,
    callback: (err: Error, result: QueryResult<R>) => void,
  ): void;
  query<R extends QueryResultRow = any, I extends any[] = any[]>(
    queryText: string,
    values: any[],
    callback: (err: Error, result: QueryResult<R>) => void,
  ): void;
  query<
    T extends Submittable,
    R1 extends QueryResultRow,
    R2 extends any[],
    I extends any[] = any[],
  >(
    queryTextOrConfig: T | string | QueryConfig<I> | QueryArrayConfig<I>,
    valuesOrCallback?:
      | I
      | ((err: Error, result: QueryResult<R1>) => void)
      | ((err: Error, result: QueryArrayResult<R2>) => void),
    maybeCallback?:
      | ((err: Error, result: QueryResult<R1>) => void)
      | ((err: Error, result: QueryArrayResult<R2>) => void),
  ): void | T | Promise<QueryArrayResult<R2>> | Promise<QueryResult<R1>> {
    // If the query is a stream, don't try anything. Use X is T to make
    // TypeScript happy.
    const isStream = (s: unknown): s is T =>
      arguments.length === 1 && !!s && typeof s === 'object' && 'submit' in s;
    if (isStream(queryTextOrConfig)) {
      throw new Error('Stream queries are not supported');
    }

    if (
      typeof valuesOrCallback === 'function' ||
      typeof maybeCallback === 'function'
    ) {
      throw new Error('Callbacks are not supported');
    }

    const text =
      typeof queryTextOrConfig === 'string'
        ? queryTextOrConfig
        : queryTextOrConfig.text;

    const values =
      (valuesOrCallback instanceof Array
        ? valuesOrCallback
        : typeof queryTextOrConfig === 'object'
          ? queryTextOrConfig.values
          : undefined) || ([] as unknown as I);

    if (
      typeof queryTextOrConfig !== 'string' &&
      'rowMode' in queryTextOrConfig &&
      queryTextOrConfig.rowMode === 'array'
    ) {
      const r = this.#db.query<R2>(text, values, { rowMode: 'array' });
      return convertResult<never, R2>(r, text);
    }

    const r = this.#db.query<R1>(text, values);
    return convertResult<R1, never>(r, text);
  }
}

async function convertResult<
  R1 extends QueryResultRow = never,
  R2 extends any[] = never,
>(
  p: Promise<Results<R1>> | Promise<Results<R2>>,
  text: string,
): Promise<QueryResult<R1> | QueryArrayResult<R2>> {
  const r = await p;
  return {
    ...r,
    command: text,
    rowCount: r.affectedRows ?? r.rows.length,
    oid: 0,
    fields: r.fields.map<FieldDef>((f) => ({
      ...f,
      tableID: 0,
      columnID: 0,
      dataTypeSize: 0,
      dataTypeModifier: 0,
      format: '',
    })),
  };
}

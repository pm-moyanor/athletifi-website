import { ClientConfig, Pool } from 'pg';
import cert from '@/lib/us-east-2-bundle.pem';
import { SqlContext, SqlContextBase, SqlResult } from '@/lib/sql-context';
import { getSecretWithShape } from '@/lib/secrets';

const sharedContext = (async () => {
  // This can cause a test failure even though it shouldn't be called, so return
  // undefined if we're in a test.
  if ('test' in global) {
    return;
  }
  const config = await getDBConfig();
  return new SqlContextImpl(config);
})();

class SqlContextImpl extends SqlContextBase {
  readonly #pool: Pool;

  constructor(cfg: ClientConfig) {
    super();
    this.#pool = new Pool(cfg);
  }

  protected _query<R extends Record<string, any> = any>(
    text: string,
    values: any[],
  ): Promise<SqlResult<R>> {
    return this.#pool.query(text, values);
  }
}

export async function executeSql<R>(
  fn: (c: SqlContext) => R | Promise<R>,
): Promise<R> {
  const pool = await sharedContext;
  if (!pool) {
    if ('test' in global) {
      throw new Error(
        'Attempted to use executeSql in a test without mocking it',
      );
    }
    throw new Error('Internal error');
  }
  const r = await fn(pool);
  return r;
}

async function getDBConfig(): Promise<ClientConfig> {
  const secret = await getSecretWithShape('RDS_proxy_user', {
    username: 'string',
    password: 'string',
    engine: 'string',
    host: 'string',
    port: 'number',
  });

  // If there's a problem with the loader/importer, this will alert us
  // immediately, as opposed to getting strange errors when postgres attempts to
  // connect.
  if (typeof cert !== 'string') {
    throw new Error('Cert loaded incorrectly');
  }

  return {
    user: secret.username,
    host: secret.host,
    database: process.env.NEXT_PG_DATABASE || 'postgres',
    password: secret.password,
    port: secret.port,
    application_name: 'Amplifi Website',
    ssl: {
      rejectUnauthorized: true,
      ca: cert,
    },
  };
}

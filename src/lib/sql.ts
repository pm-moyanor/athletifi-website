import { ClientConfig, Pool } from 'pg';
import fs from 'node:fs/promises';
import ini from 'ini';
import os from 'node:os';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
  SecretsManagerClientConfig,
} from '@aws-sdk/client-secrets-manager';
import cert from '@/lib/us-east-2-bundle.pem';
import { SqlContext, SqlContextBase, SqlResult } from './sql-context';
import path from 'node:path';
import { getSecret, getSecretWithShape } from './secrets';
import { hasShape } from './utils';

const sharedContext = getDBConfig().then((x) => new SqlContextImpl(x));

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

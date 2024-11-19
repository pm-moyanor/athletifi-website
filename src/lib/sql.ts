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
  const config: SecretsManagerClientConfig = {
    region: process.env.NEXT_AWS_REGION || 'us-east-2',
    credentials: {
      accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY ?? '',
    },
  };

  if (process.env.NEXT_AWS_PROFILE) {
    const text = await fs.readFile(
      path.join(os.homedir(), '.aws', 'credentials'),
      { encoding: 'utf-8' },
    );
    const profile = process.env.NEXT_AWS_PROFILE;
    const credentials = ini.parse(text);
    if (!(profile in credentials)) {
      throw new Error(
        `~/.aws/credentials does not contain a profile named "${profile}"`,
      );
    }
    config.credentials = {
      accessKeyId: credentials[profile].aws_access_key_id ?? '',
      secretAccessKey: credentials[profile].aws_secret_access_key ?? '',
    };
  }

  const client = new SecretsManagerClient(config);
  const { SecretString } = await client.send(
    new GetSecretValueCommand({
      SecretId: 'RDS_proxy_user',
    }),
  );
  if (!SecretString) {
    throw new Error('Secret is empty');
  }

  const secret = JSON.parse(SecretString) as {
    username: string;
    password: string;
    engine: string;
    host: string;
    port: number;
    dbInstanceIdentifier: string;
  };
  if (
    typeof secret !== 'object' ||
    !secret ||
    !('username' in secret && typeof secret.username === 'string') ||
    !('password' in secret && typeof secret.password === 'string') ||
    !('engine' in secret && typeof secret.engine === 'string') ||
    !('host' in secret && typeof secret.host === 'string') ||
    !('port' in secret && typeof secret.port === 'number') ||
    !(
      'dbInstanceIdentifier' in secret &&
      typeof secret.dbInstanceIdentifier === 'string'
    )
  ) {
    throw new Error('Malformed secret');
  }

  // If there's a problem with the loader/importer, this will alert us
  // immediately, as opposed to getting strange errors when postgres attempts to
  // connect.
  if (typeof cert !== 'string') {
    throw new Error('Cert loaded incorrectly');
  }

  return {
    user: secret.username,
    host: secret.host,
    database: secret.engine,
    password: secret.password,
    port: secret.port,
    ssl: {
      rejectUnauthorized: true,
      ca: cert,
    },
  };
}

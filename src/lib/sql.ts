import { Client, ClientConfig, Pool } from 'pg';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import cert from './us-east-2-bundle.pem';
import { zip } from './iterate';

const secretsClient = new SecretsManagerClient({
  region: 'us-east-2',
  credentials: {
    accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY ?? '',
  },
});

const sharedContext = getDBConfig().then((x) => new SqlContext(x));

class SqlContext {
  readonly #pool: Pool;

  constructor(cfg: ClientConfig) {
    this.#pool = new Pool(cfg);
  }

  query(strings: TemplateStringsArray, ...args: any[]) {
    let query = strings[0];
    const values: any[] = [];
    for (const [arg, str] of zip(args, strings.slice(1))) {
      let i = values.indexOf(arg);
      if (i < 0) {
        i = values.length;
        values.push(arg);
      }
      // TODO: Handle different types?
      query += `$${i + 1}::text${str}`;
    }
    return this.#pool.query(query, values);
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
  const { SecretString } = await secretsClient.send(
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

import fs from 'node:fs/promises';
import path from 'node:path';
import migrate from 'node-pg-migrate';
import { Client } from 'pg';
import { config as dotenv } from 'dotenv';
import { MigrationDirection } from 'node-pg-migrate/dist/types';
import config from '../../pgmconfig.json';
import { getSecretWithShape } from '../../src/lib/secrets';

main(); // stupid node and it's stupid top-level await nonsense

async function main() {
  dotenv({ path: ['.env.local', '.env'] });
  switch (process.argv[2]) {
    case 'up':
    case 'down':
      await execute(process.argv[2]);
      break;
    default:
      console.log(`Usage: ${process.argv0} ${process.argv[1]} up|down`);
      break;
  }
}

async function execute(direction: MigrationDirection) {
  if (!process.env.NEXT_PG_DATABASE) {
    console.error('NEXT_PG_DATABASE must be specified');
    process.exit(1);
  }

  // Use the proxy user secret to get the database info
  const connInfo = await getSecretWithShape('RDS_proxy_user', {
    host: 'string',
    port: 'number',
  });

  // Get the admin user secret
  const secret = await getSecretWithShape(
    'rds!db-6836c30b-81b2-47ae-a607-20e32b42a7cf',
    {
      username: 'string',
      password: 'string',
    },
  );

  const cert = await fs.readFile(
    path.join(__dirname, '../../src/lib/us-east-2-bundle.pem'),
  );

  const dbClient = new Client({
    user: secret.username,
    host: connInfo.host,
    database: process.env.NEXT_PG_DATABASE,
    password: secret.password,
    port: connInfo.port,
    application_name: 'Amplifi PG Migrate',
    ssl: {
      rejectUnauthorized: true,
      ca: cert,
    },
  });

  await dbClient.connect();

  try {
    await migrate({
      dbClient,
      direction,
      dir: config['migrations-dir'],
      migrationsTable: config['migrations-table'],
      createSchema: true,
      createMigrationsSchema: true,
      // dryRun: true,
    });
  } finally {
    await dbClient.end();
  }
}

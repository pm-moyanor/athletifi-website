import fs from 'node:fs/promises';
import path from 'node:path';
import migrate, { Migration } from 'node-pg-migrate';
import { Client, ClientBase } from 'pg';
import { config as dotenv } from 'dotenv';
import type { RunnerOptionConfig } from 'node-pg-migrate/dist/types';
import { getSecretWithShape } from '../../src/lib/secrets';
import { FilenameFormat } from 'node-pg-migrate/dist/migration';
import { config } from '../lib/config';
import { parser } from '../lib/args';

// stupid node and it's stupid top-level await nonsense
main().catch((err) => {
  console.error(err);
  process.exit(1);
});

async function main() {
  // Read .env files
  dotenv({ path: ['.env.local', '.env'] });
  // dotenv-expand(result from previous line)?

  // Parse flags
  const args = await parser.parse();
  if (args.help) {
    parser.showHelp();
    return;
  }

  // Add flags to the config
  const options: Omit<RunnerOptionConfig, 'dbClient' | 'direction'> = {
    ...config,
    checkOrder: args.checkOrder,
    verbose: args.verbose,
    ignorePattern: args.ignorePattern,
    decamelize: args.decamelize,
    dryRun: args.dryRun,
    fake: args.fake,
    singleTransaction: args.singleTransaction,
    noLock: !args.lock,
  };

  // What are we doing?
  const direction = args._.shift();
  switch (direction) {
    case 'up':
    case 'down':
    case 'redo':
      if (args.dryRun) {
        console.log('dry run');
      }
      if (args.fake) {
        console.log('fake');
      }
      if (!args.lock) {
        console.log('no lock');
      }

      // Redo = down + up
      if (direction === 'redo') {
        if (args._.length) {
          console.error('redo does not take any arguments');
          process.exit(1);
        }
        await executeWithDB(async (dbClient) => {
          await migrate({ ...options, dbClient, direction: 'down' });
          await migrate({ ...options, dbClient, direction: 'up' });
        });

        console.log('Migrations complete!');
        return;
      }

      // This must be the name of a migration file without the path and
      // extension, i.e. 1730410301688_initial_schema
      let file = args._.shift();
      if (file !== undefined && typeof file !== 'string') {
        file = `${file}`;
      }
      if (args._.length) {
        console.error('too many arguments');
        process.exit(1);
      }

      // Execute the migration
      await executeWithDB(async (dbClient) => {
        await migrate({ ...options, dbClient, direction, file });
      });

      console.log('Migrations complete!');
      break;

    case 'create':
      if (!args._.length) {
        parser.showHelp();
        process.exit(1);
      }

      // Join all the arguments to make the name and replace spaces and dashes
      // with underscores
      const name = args._.join('_').replace(/[- ]+/g, '_');

      // Create the migration
      const migrationPath = await Migration.create(name, config.dir, {
        filenameFormat: (args.migrationFilenameFormat ??
          'timestamp') as FilenameFormat,
        ...(args.templateFileName
          ? { templateFileName: args.templateFileName }
          : {
              language: 'ts',
              ignorePattern: args.ignorePattern,
            }),
      });

      console.log(`Created migration -- ${migrationPath}`);
      break;

    default:
      parser.showHelp();
      process.exit(1);
  }
}

async function executeWithDB(fn: (_: ClientBase) => void | Promise<void>) {
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

  const client = new Client({
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

  await client.connect();

  try {
    await fn(client);
  } finally {
    await client.end();
  }
}

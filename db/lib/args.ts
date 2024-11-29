/**
Copyright (c) 2024 Christopher Quadflieg

Copyright (c) 2016-2022 Salsita Software &lt;jando@salsitasoft.com&gt;

Copyright (c) 2014-2016 Theo Ephraim

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

// The contents of this file have been copied from:
// https://github.com/salsita/node-pg-migrate/blob/c50d7cadc7c7bfde74b636832140d4ff69dcad31/bin/node-pg-migrate.ts

import yargs from 'yargs/yargs';

const schemaArg = 'schema';
const createSchemaArg = 'create-schema';
const databaseUrlVarArg = 'database-url-var';
const migrationsDirArg = 'migrations-dir';
const useGlobArg = 'use-glob';
const migrationsTableArg = 'migrations-table';
const migrationsSchemaArg = 'migrations-schema';
const createMigrationsSchemaArg = 'create-migrations-schema';
const migrationFileLanguageArg = 'migration-file-language';
const migrationFilenameFormatArg = 'migration-filename-format';
const templateFileNameArg = 'template-file-name';
const checkOrderArg = 'check-order';
const configValueArg = 'config-value';
const configFileArg = 'config-file';
const ignorePatternArg = 'ignore-pattern';
const singleTransactionArg = 'single-transaction';
const lockArg = 'lock';
const timestampArg = 'timestamp';
const dryRunArg = 'dry-run';
const fakeArg = 'fake';
const decamelizeArg = 'decamelize';
const tsconfigArg = 'tsconfig';
const tsNodeArg = 'ts-node';
const tsxArg = 'tsx';
const verboseArg = 'verbose';
const rejectUnauthorizedArg = 'reject-unauthorized';
const envPathArg = 'envPath';

export const parser = yargs(process.argv.slice(2))
  .usage('Usage: $0 [up|down|create|redo] [migrationName] [options]')

  .options({
    // [databaseUrlVarArg]: {
    //   alias: 'd',
    //   default: 'DATABASE_URL',
    //   description: 'Name of env variable where is set the databaseUrl',
    //   type: 'string',
    // },
    // [migrationsDirArg]: {
    //   alias: 'm',
    //   defaultDescription: '"migrations"',
    //   describe: `The directory name or glob pattern containing your migration files (resolved from cwd()). When using glob pattern, "${useGlobArg}" must be used as well`,
    //   type: 'string',
    // },
    [useGlobArg]: {
      defaultDescription: 'false',
      describe: `Use glob to find migration files. This will use "${migrationsDirArg}" _and_ "${ignorePatternArg}" to glob-search for migration files.`,
      type: 'boolean',
    },
    // [migrationsTableArg]: {
    //   alias: 't',
    //   defaultDescription: '"pgmigrations"',
    //   describe: 'The table storing which migrations have been run',
    //   type: 'string',
    // },
    // [schemaArg]: {
    //   alias: 's',
    //   defaultDescription: '"public"',
    //   describe:
    //     'The schema on which migration will be run (defaults to `public`)',
    //   type: 'string',
    //   array: true,
    // },
    // [createSchemaArg]: {
    //   defaultDescription: 'false',
    //   describe: "Creates the configured schema if it doesn't exist",
    //   type: 'boolean',
    // },
    // [migrationsSchemaArg]: {
    //   defaultDescription: 'Same as "schema"',
    //   describe: 'The schema storing table which migrations have been run',
    //   type: 'string',
    // },
    // [createMigrationsSchemaArg]: {
    //   defaultDescription: 'false',
    //   describe: "Creates the configured migration schema if it doesn't exist",
    //   type: 'boolean',
    // },
    [checkOrderArg]: {
      defaultDescription: 'true',
      describe: 'Check order of migrations before running them',
      type: 'boolean',
    },
    [verboseArg]: {
      defaultDescription: 'true',
      describe: 'Print debug messages - all DB statements run',
      type: 'boolean',
    },
    [ignorePatternArg]: {
      defaultDescription: '"\\..*"',
      describe: `Regex or glob pattern for migration files to be ignored. When using glob pattern, "${useGlobArg}" must be used as well`,
      type: 'string',
    },
    [decamelizeArg]: {
      defaultDescription: 'false',
      describe: 'Runs decamelize on table/columns/etc names',
      type: 'boolean',
    },
    // [configValueArg]: {
    //   default: 'db',
    //   describe: 'Name of config section with db options',
    //   type: 'string',
    // },
    // [configFileArg]: {
    //   alias: 'f',
    //   describe: 'Name of config file with db options',
    //   type: 'string',
    // },
    // [migrationFileLanguageArg]: {
    //   alias: 'j',
    //   defaultDescription: 'last one used or "js" if there is no migration yet',
    //   choices: ['js', 'ts', 'sql'],
    //   describe:
    //     'Language of the migration file (Only valid with the create action)',
    //   type: 'string',
    // },
    [migrationFilenameFormatArg]: {
      defaultDescription: '"timestamp"',
      choices: ['timestamp', 'utc'],
      describe:
        'Prefix type of migration filename (Only valid with the create action)',
      type: 'string',
    },
    [templateFileNameArg]: {
      describe: 'Path to template for creating migrations',
      type: 'string',
    },
    // [tsconfigArg]: {
    //   describe: 'Path to tsconfig.json file',
    //   type: 'string',
    // },
    // [tsNodeArg]: {
    //   default: true,
    //   describe: 'Use ts-node for typescript files',
    //   type: 'boolean',
    // },
    // [tsxArg]: {
    //   default: false,
    //   describe: 'Use tsx for typescript files',
    //   type: 'boolean',
    // },
    // [envPathArg]: {
    //   describe: 'Path to the .env file that should be used for configuration',
    //   type: 'string',
    // },
    [dryRunArg]: {
      default: false,
      describe: "Prints the SQL but doesn't run it",
      type: 'boolean',
    },
    [fakeArg]: {
      default: false,
      describe: 'Marks migrations as run',
      type: 'boolean',
    },
    [singleTransactionArg]: {
      default: true,
      describe:
        'Combines all pending migrations into a single database transaction so that if any migration fails, all will be rolled back',
      type: 'boolean',
    },
    [lockArg]: {
      default: true,
      describe: 'When false, disables locking mechanism and checks',
      type: 'boolean',
    },
    // [rejectUnauthorizedArg]: {
    //   defaultDescription: 'false',
    //   describe: 'Sets rejectUnauthorized SSL option',
    //   type: 'boolean',
    // },
    // [timestampArg]: {
    //   default: false,
    //   describe: 'Treats number argument to up/down migration as timestamp',
    //   type: 'boolean',
    // },
  })

  .version(false)
  // .version()
  // .alias('version', 'i')
  .help();

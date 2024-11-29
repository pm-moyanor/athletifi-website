import path from 'node:path';
import type { RunnerOptionConfig } from 'node-pg-migrate/dist/types';

/**
 * Hard-coded migration configuration
 */
export const config = {
  dir: path.join(__dirname, '..', 'migrations'),
  migrationsTable: '__pgmigrations__',

  // Create the schema and the migration table
  schema: 'public',
  createSchema: true,
  createMigrationsSchema: true,
} as const satisfies Omit<RunnerOptionConfig, 'direction'>;

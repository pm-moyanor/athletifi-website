import { newSqlMock } from './mock-sql';

/**
 * This is a tool to dump all the SQL migration queries. This is used by the
 * pglite web-repl to set up the database.
 */

export async function sql() {
  (global as any).test = true;
  const sql = await newSqlMock({ capture: true });
  console.log(JSON.stringify(sql.captured));
}

sql();

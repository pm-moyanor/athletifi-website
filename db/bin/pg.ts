/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import repl, { Recoverable, REPLServer } from 'node:repl';
import { Context } from 'node:vm';
import { SqlContext, SqlResult } from '../../src/lib/sql-context';
import { newSqlMock } from '../../__tests__/__helpers__/mock-sql';
import { Writable } from 'node:stream';
import { Console } from 'node:console';
import path from 'node:path';

// Trick the initial schema migration into creating the RDS proxy user
(global as any).test = true;

newSqlMock().then((sql) => {
  const rs = repl.start({
    prompt: '> ',
    eval(cmd, context, file, cb) {
      evalSql.call(this, sql as unknown as SqlContext, cmd, context, file).then(
        (result) => cb(null, result),
        (error) => {
          // TODO: Detect incomplete SQL statements and mark them as recoverable.
          cb(error, undefined);
        },
      );
    },
    writer(data: any) {
      let buf: Buffer | undefined = undefined;
      const s = new Writable({
        write(
          chunk: any,
          encoding: BufferEncoding,
          callback: (error?: Error | null) => void,
        ) {
          const c = Buffer.from(chunk, encoding);
          buf = !buf ? c : Buffer.concat([buf, chunk]);
          callback();
        },
      });
      write(new Console(s, s), data);
      if (!buf) return '';
      return (buf as Buffer).toString();
    },
  });
  rs.setupHistory(path.join(__dirname, '..', '..', '.psql-history'), (err) => {
    if (err) {
      console.error(err);
    }
  });
});

async function evalSql(
  this: REPLServer,
  sql: SqlContext,
  cmd: string,
  context: Context,
  file: string,
): Promise<any> {
  return sql.query`${{ literal: cmd }}`;
}

function write(console: Console, r: SqlResult<any>) {
  if (r.rows.length) {
    console.table(r.rows);
  } else if ('affectedRows' in r) {
    console.log(`${r.affectedRows} row(s) affected.`);
  }
}

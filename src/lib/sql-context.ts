/* eslint-disable @typescript-eslint/no-explicit-any */
import { SqlValue, sqlQuery as formatQuery, QueryArg } from '@/lib/sql-format';

export interface SqlResult<
  R extends Record<string, any> = Record<string, any>,
> {
  rows: R[];
  fields: {
    name: string;
    dataTypeID: number;
  }[];
}

export interface SqlContext {
  /**
   * Queries the database using a tagged template literal.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
   */
  query<R extends Record<string, any> = any>(
    strings: TemplateStringsArray,
    ...args: QueryArg[]
  ): Promise<SqlResult<R>>;

  insert<V extends Record<string, SqlValue>>(
    table: string,
    ...values: V[]
  ): Promise<SqlResult<never>>;
}

export abstract class SqlContextBase implements SqlContext {
  protected abstract _query<R extends Record<string, any> = never>(
    text: string,
    values: any[],
  ): Promise<SqlResult<R>>;

  query(strings: TemplateStringsArray, ...args: QueryArg[]) {
    const { query, values } = formatQuery(strings, ...args);
    return this._query(query, values);
  }

  insert<V extends Record<string, any>>(
    table: string,
    ...values: V[]
  ): Promise<SqlResult<never>> {
    const r = Array.from(values);
    const columns = Array.from(new Set(r.flatMap((x) => Object.keys(x))));

    // Validate columns
    for (const c of columns) {
      if (!c || /[^-_a-z]/i.test(c)) {
        throw new Error(`Invalid column name '${c}'`);
      }
    }

    return this.query`
      INSERT INTO ${{ literal: table }} ${columns.map((c) => ({ literal: c }))}
      VALUES ${r.map((x) => columns.map((c) => x[c]))}
    `;
  }
}

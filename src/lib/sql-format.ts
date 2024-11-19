import type { Client, QueryResult, QueryResultRow } from 'pg';
import { zip } from './iterate';

export function formatterFor<R extends QueryResultRow = any>(db: {
  query(text: string, values: any[]): Promise<QueryResult<R>>;
}): (..._: Parameters<typeof sqlQuery>) => Promise<QueryResult<R>> {
  return (...a) => {
    const { query, values } = sqlQuery(...a);
    return db.query(query, values);
  };
}

export type Arrayable<T> = Iterable<T> | ArrayLike<T>;

type Literal = { literal: string };
type BasicArg = string | number | null | Literal;

export type QueryArg =
  | BasicArg
  | Arrayable<BasicArg>
  | Arrayable<Arrayable<BasicArg>>;

type ValueAdder = (v: QueryArg) => number;

/**
 * Formats a template literal as a SQL query for {@link Client.query}.
 * @see
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 */
export function sqlQuery(strings: TemplateStringsArray, ...args: QueryArg[]) {
  const values: any[] = [];
  const add = (v: any) => {
    const i = values.indexOf(v);
    if (i >= 0) return i + 1;

    values.push(v);
    return values.length;
  };

  let query = strings[0];
  for (const [arg, str] of zip(args, strings.slice(1))) {
    if (query.endsWith("'") && str.startsWith("'")) {
      // '${value}' within a query literal will result in a literal '$1' (or
      // whatever the argument number is), which is almost certainly not what
      // you want. If we do need this at some point we should add a special
      // class to indicate it is intentional, since unintentional cases will
      // break queries.
      throw new Error('Query argument is quoted. Did you mean to do that?');
    }

    query += valueFormatterFor(arg).format(add) + str;
  }
  return { query, values };
}

interface Formatter {
  type: string;
  format: (add: ValueAdder) => string;
}

const defaultFormatter = (v: BasicArg) =>
  ({
    type: 'default',
    format(add) {
      return `$${add(v)}`;
    },
  }) as const satisfies Formatter;

const literalFormatter = (v: Literal) =>
  ({
    type: 'literal',
    format() {
      return v.literal;
    },
  }) as const satisfies Formatter;

const arrayFormatter = (v: Arrayable<BasicArg | Arrayable<BasicArg>>) => {
  const f = Array.from(v).map(valueFormatterFor);
  return {
    type: 'array',
    format(add) {
      // If the value is a flat (not nested) array, wrap it in parentheses
      const s = f.map((f) => f.format(add)).join(', ');
      return f.some((f) => f.type === 'array') ? s : `(${s})`;
    },
  } as const satisfies Formatter;
};

function valueFormatterFor(value: QueryArg): Formatter {
  // TODO: Handle different types with `$1::text` etc?
  if (typeof value !== 'object') {
    return defaultFormatter(value);
  }

  if (value === null) {
    return defaultFormatter(value);
  }

  if ('literal' in value) {
    return literalFormatter(value);
  }

  return arrayFormatter(value);
}

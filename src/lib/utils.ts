export function* zip<A, B>(a: A[], b: B[]): Generator<[A, B]> {
  for (let i = 0; i < a.length && i < b.length; i++) {
    yield [a[i], b[i]];
  }
}

export type Shape = Record<string, keyof ShapeTypes>;

type ShapeTypes = {
  string: string;
  number: number;
  'string?': string | undefined;
  'number?': number | undefined;
};

type ObjectWithShape<S extends Shape> = {
  [K in keyof S]: ShapeTypes[S[K]];
};

export function hasShape<S extends Shape>(
  value: any,
  shape: S,
): value is ObjectWithShape<S> {
  if (!value || typeof value !== 'object') {
    return false;
  }
  for (const [name, type] of Object.entries(shape)) {
    if (!(name in value) || typeof value[name] !== type) {
      return false;
    }
  }
  return true;
}

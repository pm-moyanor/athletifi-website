export function* zip<A, B>(a: A[], b: B[]): Generator<[A, B]> {
  for (let i = 0; i < a.length && i < b.length; i++) {
    yield [a[i], b[i]];
  }
}

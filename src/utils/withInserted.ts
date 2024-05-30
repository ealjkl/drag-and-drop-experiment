export function withInserted<T>(arr: T[], el: T, pos: number): T[] {
  if (arr[pos] === undefined) {
    return arr.map((x, i) => (i == pos ? el : x));
  } else {
    return arr.flatMap((x, i) => (i == pos ? [el, x] : x));
  }
}

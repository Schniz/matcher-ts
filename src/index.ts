type IndexableKeys<T> = {
  [key in keyof T]: T[key] extends string ? key : never;
}[keyof T];

export function matcher<T>(): <K extends Extract<IndexableKeys<T>, keyof T>>(
  key: K
) => <R>(
  legs: {
    [key in Extract<T[K], string>]: (arg: T & Record<K, key>) => R;
  }
) => (t: T) => R {
  return key => legs => t => {
    const state = t[key];
    return legs[state as keyof typeof legs](t as any);
  };
}

export function matcherOptional<T>(): <K extends IndexableKeys<T>>(
  key: K
) => <R>(
  legs: {
    [key in Extract<T[Extract<K, keyof T>], string>]?: (
      arg: T & Record<K, key>
    ) => R;
  }
) => (t: T) => R | undefined {
  return key => legs => t => {
    const state = t[key];
    return legs[state as keyof typeof legs]?.(t as any);
  };
}

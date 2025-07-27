export type NestedValues<T> =
  T extends Record<string, infer V>
    ? V extends Record<string, string>
      ? V[keyof V]
      : never
    : never;

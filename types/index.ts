/**
 * OmitType
 * @param P - Parameter type
 * @param T - Type to omit: string | number | Function...
 * @example
 * ```typescript
 * // { a: string; b: string; }
 * type R = OmitType<{ a: string, b: string, c: Function }, Function>;
 * ```
 */
export type OmitType<P, T> = Pick<P, { [K in keyof P]: P[K] extends T ? never : K }[keyof P]>;

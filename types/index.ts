export type OmitType<P, T> = Pick<P, { [K in keyof P]: P[K] extends T ? never : K }[keyof P]>;

export type Optional<T> = T | undefined;

export type Constructor<T> = { new(): T };
export type ConstructorWithArgs<T, Args> = { new(args: Args): T };
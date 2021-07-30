# Partial，Pick，Exclude，Omit

## Partial
```ts
type Partial<T> = {
  [P in keyof T]?: T[P]
}
```

## Pick
```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

## Exclude
```ts
type Exclude<T, U> = T extends U ? never : T
```

## Omit
```ts
type Omit<T, K extends string | number | symbol> = {
  [P in Exclude<keyof T, K>]: T[P]
}
```

## Parameters
```ts
type Parameters<T extends (...args: any)> = T extends (...args: infer P) => any ? P : never

function a(x: number, y: number): void {}
const b: Parameters<a> = {x: 1, y: 2}
```
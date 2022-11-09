---
title: useRemoteDataMutate.ts
nav_order: 3
parent: Modules
---

## useRemoteDataMutate overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [useRemoteDataMutate](#useremotedatamutate)

---

# utils

## useRemoteDataMutate

Wrapper hook for `useMutation`.

Forces the `mutationFn` to return a `TaskEither<E, Option<A>>` and returns RemoteData<E, A>.

**Signature**

```ts
export default function useRemoteDataMutate<A, E, TError = unknown, TVariables = unknown, TContext = unknown>(
  mutationFn: (variables: TVariables) => Promise<E.Either<E, O.Option<A>>>,
  options: UseMutationOptions<E.Either<E, O.Option<A>>, TError, TVariables, TContext> = {}
): [RD.RemoteData<E, A>, UseMutationResult<E.Either<E, O.Option<A>>, TError, TVariables, TContext>]
```

Added in v1.0.0

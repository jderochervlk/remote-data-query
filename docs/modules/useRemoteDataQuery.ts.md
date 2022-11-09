---
title: useRemoteDataQuery.ts
nav_order: 4
parent: Modules
---

## useRemoteDataQuery overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [useRemoteDataQuery](#useremotedataquery)

---

# utils

## useRemoteDataQuery

**Signature**

```ts
export default function useRemoteDataQuery<E, A, U>(
  options: OptionsWithDecoder<E, A, U>
): RD.RemoteData<E | t.Errors, U>
export default function useRemoteDataQuery<E, A, U>(options: OptionsWithoutDecoder<E, A, U>): RD.RemoteData<E, A>
```

Added in v1.0.0

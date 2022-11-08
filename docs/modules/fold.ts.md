---
title: fold.ts
nav_order: 1
parent: Modules
---

## fold overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [fold](#fold)

---

# utils

## fold

**Signature**

```ts
export default function fold<E, A, T>(
  remoteData: RD.RemoteData<E, A>,
  loading: () => T,
  failure: (e: E) => T,
  empty: () => T,
  success: (a: A) => T
)
```

Added in v1.0.0

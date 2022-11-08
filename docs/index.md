---
title: Home
nav_order: 1
---

# @jvlk/remote-data-query

Work with responses from [`@tanstack/react-query`](https://tanstack.com/) using [`@jvlk/fp-ts-remote-data`](https://jderochervlk.github.io/fp-ts-remote-data/) and [`fp-ts`](https://gcanti.github.io/fp-ts/).

## Installing

npm

```
npm i @jvlk/remote-data-query typescript fp-ts
```

yarn

```
yarn add @jvlk/remote-data-query typescript fp-ts
```

## Example

You'll need an API call that returns a `TaskEither<E, Option<A>>`. You can use [`safeFetchJson`](https://jderochervlk.github.io/fp-ts-fetch/modules/safeFetchJson.ts.html) from `@jvlk/fp-ts-fetch` and then parse the results using `O.fromNullable`.

> Note: Your application must be wrapped with a [`QueryClientProvider`](https://tanstack.com/query/v4/docs/reference/QueryClientProvider).

```tsx
import * as TE from 'fp-ts/lib/TaskEither'
import * as O from 'fp-ts/lib/Option'
import { fold, useRemoteDataQuery } from '@jvlk/remote-data-query'
import { safeFetchJSon } from '@jvlk/fp-ts-fetch'

function fetchUserName(id: string) {
  return pipe(
    safeFetchJson(`www.api.com/user/${id}`),
    map(flow(O.fromNullable, O.chain(R.lookup('name'))))
  )
}

function User(props: { userId: string }) {
  const userData = useRemoteDataQuery({
    queryFn: fetchUserName(userId),
    queryKey: [userId],
  })

  return fold(
    userData,
    () => <p>loading...</p>,
    (e) => <p>There was an error: {JSON.stringify(e)}</p>,
    () => <p>No user found.</p>,
    (name) => <p>Hello {name}!</p>
  )
}
```

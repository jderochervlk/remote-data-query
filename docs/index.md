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
import * as O from 'fp-ts/Option'
import * as TE from 'fp-ts/TaskEither'
import * as t from 'io-ts'
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
    decoder: t.string // this is optional, but recommended
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

## Using with `fp-ts`
You can pass a `decoder` from [`io-ts`](https://gcanti.github.io/io-ts/) to parse the data that is returned from the API request. This is optional, but I highly encourage you to do this! Any errors returned from `io-ts` will return a `Failure<t.Errors>`, and instead of the hook returning a `Success<unknown>` you will get the type of the `decoder` you use. The above example returns `Success<string>`.
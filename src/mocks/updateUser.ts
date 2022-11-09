import { safeFetchJson } from '@jvlk/fp-ts-fetch'
import { flow, pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import * as O from 'fp-ts/Option'
import * as R from 'fp-ts/Record'
import * as Json from 'fp-ts/Json'

export default function updateUser(body: { name: string; id: string }) {
  return pipe(
    Json.stringify(body),
    TE.fromEither,
    TE.chainW((body) =>
      safeFetchJson(`www.api.com/user`, { method: 'POST', body })
    ),
    TE.map(flow(O.fromNullable, O.chain(R.lookup('name'))))
  )
}

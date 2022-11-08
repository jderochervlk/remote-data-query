import { safeFetchJson } from '@jvlk/fp-ts-fetch'
import { flow, pipe } from 'fp-ts/function'
import { map } from 'fp-ts/TaskEither'
import * as O from 'fp-ts/Option'
import * as R from 'fp-ts/Record'

export default function fetchUserName(id: string) {
  return pipe(
    safeFetchJson(`www.api.com/user/${id}`),
    map(flow(O.fromNullable, O.chain(R.lookup('name'))))
  )
}

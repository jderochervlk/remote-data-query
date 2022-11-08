/**
 * @since 1.0.0
 */

import * as RD from '@jvlk/fp-ts-remote-data'
import { useQuery } from '@tanstack/react-query'
import * as E from 'fp-ts/lib/Either'
import { flow, pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import * as TE from 'fp-ts/lib/TaskEither'
import * as t from 'io-ts'
import decode from './decode'

type Options<E, A, U> = {
  queryKey: string[]
  queryFn: TE.TaskEither<E, O.Option<A>>
  decoder?: t.Decoder<A, U>
}

/**
 * @since 1.0.0
 */
export default function useRemoteDataQuery<E, A, U>(options: Options<E, A, U>) {
  const { isLoading, data } = useQuery(options)

  return isLoading
    ? RD.loading
    : data
    ? pipe(
        data,
        decode(options.decoder),
        E.foldW(RD.failure, flow(O.fold(() => RD.empty, RD.success)))
      )
    : RD.empty
}

/**
 * @since 1.0.0
 */

import * as RD from '@jvlk/fp-ts-remote-data'
import { useQuery } from '@tanstack/react-query'
import * as E from 'fp-ts/lib/Either'
import { flow, pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import * as TE from 'fp-ts/lib/TaskEither'

type Options<E, A> = {
  queryKey: string[]
  queryFn: TE.TaskEither<E, O.Option<A>>
}

/**
 * @since 1.0.0
 */
export default function useRemoteDataQuery<E, A>(options: Options<E, A>) {
  const { isLoading, data } = useQuery(options)

  return isLoading
    ? RD.loading
    : data
    ? pipe(data, E.foldW(RD.failure, flow(O.fold(() => RD.empty, RD.success))))
    : RD.empty
}

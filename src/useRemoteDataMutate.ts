/**
 * @since 1.0.0
 */

import * as RD from '@jvlk/fp-ts-remote-data'
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query'
import * as E from 'fp-ts/Either'
import { flow, pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'

/**
 * Wrapper hook for `useMutation`.
 *
 * Forces the `mutationFn` to return a `TaskEither<E, Option<A>>` and returns RemoteData<E, A>.
 *
 * @since 1.0.0
 */
export default function useRemoteDataMutate<
  A,
  E,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown
>(
  mutationFn: (variables: TVariables) => Promise<E.Either<E, O.Option<A>>>,
  options: UseMutationOptions<
    E.Either<E, O.Option<A>>,
    TError,
    TVariables,
    TContext
  > = {}
): [
  RD.RemoteData<E, A>,
  UseMutationResult<E.Either<E, O.Option<A>>, TError, TVariables, TContext>
] {
  const mutation = useMutation({ ...options, mutationFn })
  const response = mutation.isLoading
    ? RD.loading
    : mutation.data
    ? pipe(
        mutation.data,
        // decode(options.decoder),
        E.foldW(RD.failure, flow(O.fold(() => RD.empty, RD.success)))
      )
    : RD.empty

  return [response, mutation]
}

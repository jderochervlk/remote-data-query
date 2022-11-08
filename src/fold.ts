/**
 * @since 1.0.0
 */
import * as RD from '@jvlk/fp-ts-remote-data'
import { pipe } from 'fp-ts/lib/function'

/**
 * @since 1.0.0
 */
export default function fold<E, A, T>(
  remoteData: RD.RemoteData<E, A>,
  loading: () => T,
  failure: (e: E) => T,
  empty: () => T,
  success: (a: A) => T
) {
  return pipe(remoteData, RD.fold(loading, failure, empty, success))
}

/**
 * @since 1.0.0
 */
import * as t from 'io-ts'
import * as O from 'fp-ts/lib/Option'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'

/**
 * @since 1.0.0
 */
export default function decode<T, U>(decoder?: t.Decoder<T, U> | undefined) {
  return function <E>(
    input: E.Either<E, O.Option<T>>
  ): E.Either<E | t.Errors, O.Option<T | U>> {
    return decoder
      ? pipe(
          input,
          E.chainW((data) => {
            if (O.isNone(data)) {
              return E.right(data)
            }
            const v = decoder.decode(data.value)
            return v._tag === 'Right'
              ? E.right(O.some(v.right))
              : E.left(v.left)
          })
        )
      : input
  }
}

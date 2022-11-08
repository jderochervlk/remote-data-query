import * as t from 'io-ts'
import * as O from 'fp-ts/Option'
import * as E from 'fp-ts/Either'
import decode from './decode'

const schema = t.type({
  name: t.string,
})

const stringDecoder = t.string

test('valid data returns the same', () => {
  expect(decode(stringDecoder)(E.right(O.of('foo')))).toEqual(
    E.right(O.of('foo'))
  )
})

test('invalid data returns an error', () => {
  expect(decode(stringDecoder)(E.right(O.of(101)))).toEqual(
    E.left(expect.any(Array))
  )
})

test('empty data passes through', () => {
  expect(decode(stringDecoder)(E.right(O.none))).toEqual(E.right(O.none))
})

test('errors pass through', () => {
  expect(decode(stringDecoder)(E.left(Error('error')))).toEqual(
    E.left(Error('error'))
  )
})

test('data passes through when there is no decoder', () => {
  expect(decode()(E.right(O.of('foo')))).toEqual(E.right(O.of('foo')))
})

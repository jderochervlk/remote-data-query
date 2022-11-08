import { empty, failure, loading, success } from '@jvlk/fp-ts-remote-data'
import fold from './fold'

test('fold', () => {
  expect(
    fold(
      loading,
      () => 'loading',
      () => 'failure',
      () => 'empty',
      () => 'success'
    )
  ).toEqual('loading')

  expect(
    fold(
      failure('eror'),
      () => 'loading',
      () => 'failure',
      () => 'empty',
      () => 'success'
    )
  ).toEqual('failure')

  expect(
    fold(
      empty,
      () => 'loading',
      () => 'failure',
      () => 'empty',
      () => 'success'
    )
  ).toEqual('empty')

  expect(
    fold(
      success('succes'),
      () => 'loading',
      () => 'failure',
      () => 'empty',
      () => 'success'
    )
  ).toEqual('success')
})

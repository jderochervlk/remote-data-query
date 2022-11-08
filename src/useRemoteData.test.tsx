import { safeFetchJson } from '@jvlk/fp-ts-fetch'
import * as RD from '@jvlk/fp-ts-remote-data'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { renderHook } from '@testing-library/react-hooks'
import { flow, pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'
import * as R from 'fp-ts/Record'
import * as TE from 'fp-ts/TaskEither'
import React, { ReactNode } from 'react'
import fetchUserName from './mocks/fetchUserName'
import useRemoteDataQuery from './useRemoteDataQuery'

const queryClient = new QueryClient()

const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

test('loads and then returns success', async () => {
  const { result, waitFor } = renderHook(
    () =>
      useRemoteDataQuery({
        queryFn: fetchUserName('1'),
        queryKey: ['test-one'],
      }),
    { wrapper }
  )

  expect(result.current).toEqual(RD.loading)

  await waitFor(() => result.current._tag === 'Success')

  expect(result.current).toEqual(RD.success('Bilbo Baggins'))
})

test('loads and then returns empty', async () => {
  const { result, waitFor } = renderHook(
    () =>
      useRemoteDataQuery({ queryFn: fetchUserName('2'), queryKey: ['test-2'] }),
    { wrapper }
  )

  expect(result.current).toEqual(RD.loading)

  await waitFor(() => result.current._tag === 'Empty')

  expect(result.current).toEqual(RD.empty)
})

test('loads and then returns failure', async () => {
  const { result, waitFor } = renderHook(
    () =>
      useRemoteDataQuery({ queryFn: fetchUserName('3'), queryKey: ['test-3'] }),
    { wrapper }
  )

  expect(result.current).toEqual(RD.loading)

  await waitFor(() => result.current._tag === 'Failure')

  expect(result.current).toEqual(
    RD.failure(expect.objectContaining({ ok: false, status: 500 }))
  )
})

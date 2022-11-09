import * as RD from '@jvlk/fp-ts-remote-data'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook } from '@testing-library/react-hooks'
import React, { ReactNode } from 'react'
import updateUser from './mocks/updateUser'
import useRemoteDataMutate from './useRemoteDataMutate'

const queryClient = new QueryClient()

const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

test('useRemoteDataMutate', async () => {
  const { result, waitFor } = renderHook(
    () =>
      useRemoteDataMutate(
        (variables: { name: string; id: string }) => updateUser(variables)(),
        {
          mutationKey: ['test-one'],
        }
      ),
    { wrapper }
  )

  const mutation = result.current[1]

  act(() => {
    mutation.mutate({ name: 'Frodo Baggins', id: '1' })
  })

  await waitFor(() => result.current[0]._tag === 'Success')

  expect(result.current[0]).toEqual(RD.success('Frodo Baggins'))

  act(() => {
    mutation.mutate({ name: 'Frodo Baggins', id: '2' })
  })

  await waitFor(() => result.current[0]._tag === 'Empty')

  expect(result.current[0]).toEqual(RD.empty)

  act(() => {
    mutation.mutate({ name: 'Frodo Baggins', id: '3' })
  })

  await waitFor(() => result.current[0]._tag === 'Failure')

  expect(result.current[0]).toEqual(
    RD.failure(expect.objectContaining({ ok: false, status: 500 }))
  )
})

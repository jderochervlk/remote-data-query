import * as RD from '@jvlk/fp-ts-remote-data'
import { useMutation, useQuery } from '@tanstack/react-query'
import { act, renderHook } from '@testing-library/react-hooks'
import fetchUserName from './mocks/fetchUserName'
import updateUser from './mocks/updateUser'
import useRemoteDataMutate from './useRemoteDataMutate'
import useRemoteDataQuery from './useRemoteDataQuery'

jest.mock('@tanstack/react-query')
// @ts-expect-error - we just need to mock out enough to test that our hook works
jest.mocked(useQuery).mockImplementation(() => ({ data: undefined }))

jest
  .mocked(useMutation)
  // @ts-expect-error - we just need to mock out enough to test that our hook works
  .mockImplementation(() => ({ data: undefined, mutate: jest.fn() }))
  
test('returns empty if data returned by useQuery is undefined', async () => {
  const { result } = renderHook(() =>
    useRemoteDataQuery({ queryFn: fetchUserName('2'), queryKey: ['test-4'] })
  )
  expect(result.current).toEqual(RD.empty)
})

test('returns empty if data returned by useMutation is undefined', async () => {
  const { result, waitFor } = renderHook(() =>
    useRemoteDataMutate((variables: { name: string; id: string }) =>
      updateUser(variables)()
    )
  )

  const mutation = result.current[1]

  act(() => {
    mutation.mutate({ name: 'Frodo Baggins', id: '7' })
  })

  await waitFor(() => result.current[0]._tag === 'Empty')

  expect(result.current[0]).toEqual(RD.empty)
})

import * as RD from '@jvlk/fp-ts-remote-data'
import { useQuery } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react-hooks'
import fetchUserName from './mocks/fetchUserName'
import useRemoteDataQuery from './useRemoteDataQuery'

jest.mock('@tanstack/react-query')
// @ts-expect-error - we just need to mock out enough to test that our hook works
jest.mocked(useQuery).mockImplementation(() => ({ data: undefined }))
test('returns empty if data returned by useQuery is undefined', async () => {
  const { result } = renderHook(() =>
    useRemoteDataQuery({ queryFn: fetchUserName('2'), queryKey: ['test-4'] })
  )
  expect(result.current).toEqual(RD.empty)
})

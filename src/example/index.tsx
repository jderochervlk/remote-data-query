import * as O from 'fp-ts/Option'
import * as TE from 'fp-ts/TaskEither'
import * as t from 'io-ts'
import { fold, useRemoteDataQuery } from '@jvlk/remote-data-query'
import { safeFetchJson } from '@jvlk/fp-ts-fetch'
import { flow, pipe } from 'fp-ts/function'
import React from 'react'

function fetchRandomStrings() {
  return pipe(
    safeFetchJson(`https://baconipsum.com/api/?type=meat-and-filler`),
    TE.map(flow(O.fromNullable))
  )
}

export default function App() {
  const randomData = useRemoteDataQuery({
    queryFn: fetchRandomStrings(),
    queryKey: ['random-string'],
    decoder: t.array(t.string), // this is optional, but recommended
  })

  return fold(
    randomData,
    () => <p>loading...</p>,
    (e) => <p>There was an error: {JSON.stringify(e)}</p>,
    () => <p>No text found.</p>,
    (text) => (
      <>
        {text.map((line, i) => (
          <p key={`${line.slice(0, 5)}-${i}`}>{line}</p>
        ))}
      </>
    )
  )
}

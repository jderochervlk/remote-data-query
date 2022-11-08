import { rest } from 'msw'
import { match } from 'ts-pattern'

export const handlers = [
  rest.get('www.api.com/user/:id', (req, res, ctx) => {
    const { id } = req.params

    return match(id)
      .with('1', () =>
        res(ctx.status(200), ctx.json({ name: 'Bilbo Baggins' }))
      )
      .with('2', () => res(ctx.status(204), ctx.json({})))
      .with('3', () => res(ctx.status(500)))
      .otherwise(() => res(ctx.status(204), ctx.json({})))
  }),
]

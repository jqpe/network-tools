import { Hono } from 'hono'

const app = new Hono().basePath('/api')

const route = app.get('/iana/db/:path', async ctx => {
  const path = ctx.req.param().path
  if (!path || typeof path !== 'string') {
    return new Response('see documentation', { status: 400 })
  }

  const IANA_DB = 'https://www.iana.org/domains/root/db/'
  const result = await fetch(new URL(path, IANA_DB), {
    headers: {
      'user-agent': ctx.req.header('User-Agent') ?? 'network-tools',
    },
  })
  const text = await result.text()
  return new Response(text, result)
})

export type AppType = typeof route

export default app

interface Env {}

export const onRequest: PagesFunction<Env> = async ctx => {
  if (!ctx.params.path || typeof ctx.params.path !== 'string') {
    return new Response('see documentation', { status: 400 })
  }

  const IANA_DB = 'https://www.iana.org/domains/root/db/'
  const result = await fetch(new URL(ctx.params.path, IANA_DB), {
    headers: {
      'user-agent': ctx.request.headers.get('user-agent') ?? 'network-tools',
    },
  })
  const text = await result.text()
  return new Response(text, result)
}

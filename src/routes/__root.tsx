import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { Header } from '~/components/header'

const Root = () => {
  return (
    <>
      <Header />
      <hr />

      <Outlet />
    </>
  )
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: Root,
})

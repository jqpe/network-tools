import { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  Outlet,
  ScrollRestoration,
} from '@tanstack/react-router'
import { BackToTop } from '~/components/back-to-top'
import { Header } from '~/components/header'
import { ThemeProvider } from '~/components/theme-provider'

const Root = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <Header />
      <hr />

      <Outlet />
      <BackToTop />
    </ThemeProvider>
  )
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: Root,
})

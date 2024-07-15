import { createFileRoute, Link } from '@tanstack/react-router'
import { H1 } from '~/components/ui/typography'

const Homepage = () => {
  return (
    <main className="max-w-prose m-auto py-6">
      <H1>site title</H1>
      <Link to="/tld">Search for a top level domain</Link>
    </main>
  )
}

export const Route = createFileRoute('/')({
  component: Homepage,
})

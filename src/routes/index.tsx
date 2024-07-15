import { createFileRoute } from '@tanstack/react-router'
import { Link } from '~/components/ui/link.tsx'
import { H1 } from '~/components/ui/typography'
import { SITE_NAME } from '~/constants'

const Homepage = () => {
  return (
    <main className="max-w-prose m-auto py-6">
      <H1>{SITE_NAME}</H1>
      <Link to="/tld">Search for a top level domain</Link>
    </main>
  )
}

export const Route = createFileRoute('/')({
  component: Homepage,
})

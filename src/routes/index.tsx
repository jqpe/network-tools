import { createFileRoute } from '@tanstack/react-router'
import { Gears } from '~/components/assets/gears.svg'
import { Link } from '~/components/ui/link.tsx'
import { H1 } from '~/components/ui/typography'
import { SITE_NAME } from '~/constants'

const Homepage = () => {
  return (
    <main className="max-w-prose m-auto py-8 px-2">
      <H1>{SITE_NAME}</H1>
      <Link className="mt-4 block" to="/tld">
        Search for a top-level domain
      </Link>
      <Link className="mt-4 block" to="/whois">
        Whois information
      </Link>

      <Gears />
    </main>
  )
}

export const Route = createFileRoute('/')({
  component: Homepage,
})

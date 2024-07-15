import { createFileRoute } from '@tanstack/react-router'
import { H1 } from '~/components/ui/typography'

const AboutPage = () => {
  return (
    <main className="mx-auto max-w-prose py-8">
      <H1>About</H1>

      <p></p>
    </main>
  )
}

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

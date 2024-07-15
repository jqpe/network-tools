import { createFileRoute } from '@tanstack/react-router'
import { H1, Paragraph } from '~/components/ui/typography'
import { SITE_NAME } from '~/constants'

const AboutPage = () => {
  return (
    <main className="mx-auto max-w-prose py-8">
      <H1>About</H1>

      <Paragraph className="mt-2">
        {SITE_NAME} provides various tools to learn about networking.
      </Paragraph>
    </main>
  )
}

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

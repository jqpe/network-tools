import { createFileRoute } from '@tanstack/react-router'
import { H1, Paragraph } from '~/components/ui/typography'

const AboutPage = () => {
  return (
    <main className="mx-auto max-w-prose py-8">
      <H1>About</H1>

      <Paragraph>
        tldid provides various tools to learn about networking, as well
      </Paragraph>
    </main>
  )
}

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

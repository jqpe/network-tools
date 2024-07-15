import { createFileRoute } from '@tanstack/react-router'

const AboutPage = () => {
  return (
    <main className="prose mx-auto py-8">
      <h1>About</h1>

      <p></p>
    </main>
  )
}

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

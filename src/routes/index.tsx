import { createFileRoute, Link } from '@tanstack/react-router'

const Homepage = () => {
  return (
    <main className="prose max-w-prose m-auto py-6">
      <h1>site title</h1>
      <Link to="/tld">Search for a top level domain</Link>
    </main>
  )
}

export const Route = createFileRoute('/')({
  component: Homepage,
})

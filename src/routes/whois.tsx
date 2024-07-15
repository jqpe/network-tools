import { createFileRoute, Outlet } from '@tanstack/react-router'
import React from 'react'
import { Input } from '~/components/ui/input'
import { H1, Paragraph } from '~/components/ui/typography'

const WhoisPage = () => {
  const navigate = Route.useNavigate()
  const [domain, setDomain] = React.useState<string>()

  const onInput: React.FormEventHandler<HTMLInputElement> = event => {
    event.preventDefault()
    const { value } = event.currentTarget

    setDomain(value)
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()

    if (domain) {
      navigate({
        to: '/whois/$domain',
        params: { domain },
      })
    }
  }

  return (
    <main className="max-w-prose mx-auto py-8">
      <H1>Whois</H1>
      <Paragraph className="text-foreground/70 mt-2">
        Lookup whois infromation (e.g. expiry date, status...) for a domain. Not
        all top level domains are supported at the moment, but common ones are.
        Mileage may vary.
      </Paragraph>
      <form onSubmit={onSubmit} className="flex gap-2 mt-4">
        <Input
          autoComplete="off"
          autoCorrect="off"
          id="tld"
          name="tld"
          onInput={onInput}
          placeholder="Enter a domain, e.g. google.com"
        />
      </form>
      <Outlet />
    </main>
  )
}

export const Route = createFileRoute('/whois')({
  component: WhoisPage,
})

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '~/components/ui/popover.tsx'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Info } from 'lucide-react'
import React from 'react'
import { Input } from '~/components/ui/input'
import { Code, H1, H4, Paragraph, Text } from '~/components/ui/typography'
import { Anchor } from '~/components/ui/link'

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
    <main className="max-w-prose mx-auto py-8 px-2">
      <H1>Whois</H1>
      <Paragraph className="text-foreground/70 mt-2">
        Lookup whois information (e.g. expiry date, status...) for a domain. Not
        all top-level domains are supported at the moment, but common ones are.
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
        <Popover>
          <PopoverTrigger>
            <Info />
          </PopoverTrigger>
          <PopoverContent className="text-xs *:my-2">
            <H4 className="[&]:my-0">How does it work?</H4>
            <Text>
              The service is based on{' '}
              <Anchor href="https://about.rdap.org">
                Registration Data Access Protocol (RDAP)
              </Anchor>
              , which is a novel alternative to proprietary whois servers.
            </Text>
            <Text>
              As DRAP is still new, some top-level domains don't support it.
              Common ones like <Code>.com</Code> and <Code>.org</Code> do.
            </Text>
            <Text>
              You can search using fully qualified domain names, IP addresses,
              or with autonomous system numbers.
            </Text>
          </PopoverContent>
        </Popover>
      </form>
      <Outlet />
    </main>
  )
}

export const Route = createFileRoute('/whois')({
  component: WhoisPage,
})

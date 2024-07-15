import { createFileRoute, Outlet } from '@tanstack/react-router'

import { Info } from 'lucide-react'
import React from 'react'

import { useNavigate } from '@tanstack/react-router'
import { TldList } from '~/components/tld-list.tsx'
import { Input } from '~/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { Code, H1, H4, Paragraph, Text } from '~/components/ui/typography'
import { useTlds } from '~/services/iana'
import { IanaTld } from '~/types/iana.ts'

const TldPage = () => {
  const navigate = useNavigate({ from: '/tld' })
  const [filter, setFilter] = React.useState<RegExp>()
  const ianaQuery = useTlds()

  const { tlds } = ianaQuery.data ?? {}

  const updatedAt = ianaQuery.data?.updatedAt.toLocaleDateString()

  const tldFilterPredicate = (tld: IanaTld): boolean => {
    if (!filter) return true

    const unicodeOk = filter.test(tld.unicode)
    const punycodeOk = Boolean(tld.punycode && filter.test(tld.punycode))

    return unicodeOk || punycodeOk
  }

  const onInput: React.FormEventHandler<HTMLInputElement> = event => {
    event.preventDefault()
    const { value } = event.currentTarget
    setFilter(value ? new RegExp(value, 'gi') : undefined)
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()

    const tld = tlds?.filter(tldFilterPredicate).at(0)

    if (tld) {
      navigate({ to: '$tld', params: { tld: tld.punycode ?? tld.unicode } })
    }
  }

  if (ianaQuery.isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        Loading...
      </div>
    )
  }

  return (
    <main className="max-w-prose mx-auto py-8 px-2">
      <H1>Top level domains</H1>

      <Paragraph className="text-foreground/70 mt-2">
        All top level domains in the root zone, updated <b>{updatedAt}</b>
      </Paragraph>

      <form onSubmit={onSubmit} className="flex gap-2 mt-4">
        <Input
          autoComplete="off"
          autoCorrect="off"
          id="tld"
          name="tld"
          onInput={onInput}
          placeholder="Search with a regex"
        />
        <Popover>
          <PopoverTrigger>
            <Info />
          </PopoverTrigger>
          <PopoverContent className="text-xs *:my-2">
            <H4 className="[&]:my-0">Regular expression search</H4>
            <Text>The regular expression is global and case-insensitive.</Text>
            <Text>
              To list domains that end with AA: <Code>aa$</Code>
            </Text>
            <Text>
              To list domains that begin with AA: <Code>^aa</Code>
            </Text>
            <Text>
              To fuzzily match any top level domain that contains AA:{' '}
              <Code>aa</Code>
            </Text>
          </PopoverContent>
        </Popover>
      </form>

      <TldList tlds={tlds ?? []} filter={tldFilterPredicate} />

      <Outlet />
    </main>
  )
}

export const Route = createFileRoute('/tld')({
  component: TldPage,
})

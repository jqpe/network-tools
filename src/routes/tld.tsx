import { createFileRoute, Outlet } from '@tanstack/react-router'

import { Info } from 'lucide-react'
import React from 'react'

import { TldList } from '~/components/tld-list.tsx'
import { useNavigate } from '@tanstack/react-router'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { INITIAL_TLD_FILTER } from '~/constants'
import { useIana } from '~/services/iana'
import { IanaTld } from '~/types/iana.ts'

const TldPage = () => {
  const navigate = useNavigate({ from: '/tld' })
  const [filter, setFilter] = React.useState<RegExp>(INITIAL_TLD_FILTER)
  const ianaQuery = useIana()

  const { tlds } = ianaQuery.data ?? {}

  const updatedAt = ianaQuery.data?.updatedAt.toLocaleDateString()

  const tldFilterPredicate = (tld: IanaTld): boolean => {
    return filter.test(tld.unicode) || filter.test(tld.punycode)
  }

  const onInput: React.FormEventHandler<HTMLInputElement> = event => {
    event.preventDefault()
    const { value } = event.currentTarget
    setFilter(value ? new RegExp(value, 'gi') : INITIAL_TLD_FILTER)
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()

    const tld = tlds.filter(tldFilterPredicate).at(0)

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
    <main className="prose mx-auto py-8">
      <h1>Top level domains</h1>

      <p>
        All top level domains in the root zone, updated <b>{updatedAt}</b>
      </p>

      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          id="tld"
          name="tld"
          onInput={onInput}
          className="block border-slate-50 shadow-md border-2 rounded-md my-1 px-2 py-0.5 w-full"
          placeholder="Search with a regex"
        />
        <Popover>
          <PopoverTrigger>
            <Info />
          </PopoverTrigger>
          <PopoverContent className="prose *:my-1">
            <h4>Regular expression search</h4>
            <p>The regular expression is global and case-insensitive.</p>
            <p>
              For example, to list domains ending with AA type <code>aa$</code>
            </p>
            <p>
              To list domains beginning with AA type <code>^aa</code>
            </p>
            <p>
              To fuzzily match any top level domain that contains AA type{' '}
              <code>aa</code>
            </p>
          </PopoverContent>
        </Popover>
      </form>

      <TldList tlds={tlds} filter={tldFilterPredicate} />

      <Outlet />
    </main>
  )
}

export const Route = createFileRoute('/tld')({
  component: TldPage,
})

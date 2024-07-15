import { createFileRoute, Outlet } from '@tanstack/react-router'

import React from 'react'
import { Info } from 'lucide-react'

import { TldList } from '~/components/tld-list.tsx'
import { INITIAL_TLD_FILTER } from '~/constants'
import { useIana } from '~/services/iana'
import { IanaTld } from '~/types/iana.ts'
import {
  DialogTitle,
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
} from '~/components/ui/dialog'

const TldPage = () => {
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

      {/* TODO: a good feature would be to open first link on submit*/}
      <form onSubmit={event => event.preventDefault()} className="flex gap-2">
        <input
          onInput={onInput}
          className="block border-slate-200 border-2 rounded-sm my-2 px-0.5 w-full"
          placeholder="search with a regular expression"
        />
        <Dialog>
          <DialogTrigger>
            <Info />
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Regular expression search</DialogTitle>
            <DialogDescription className="prose">
              <p>The regular expression is global and case-insensitive.</p>
              <p>
                For example, to list domains ending with AA type{' '}
                <code>aa$</code>
              </p>
              <p>
                To list domains beginning with GOO type <code>^goo</code>
              </p>
              <p>
                To fuzzily match any top level domain that contains OOK type{' '}
                <code>ook</code>
              </p>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </form>

      <TldList tlds={tlds} filter={tldFilterPredicate} />

      <Outlet />
    </main>
  )
}

export const Route = createFileRoute('/tld')({
  component: TldPage,
})

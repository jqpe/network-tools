import { createFileRoute, useNavigate } from '@tanstack/react-router'
import React from 'react'
import { Badge } from '~/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Anchor } from '~/components/ui/link'
import { IANA_DB } from '~/constants'
import { useIfDefined } from '~/hooks/use-if-defined'
import { tldsOptions, useTld, useTlds } from '~/services/iana'

// How long to wait before navigating to previous screen upon
// Dialog being closed; when zero no close animation for dialog
const DIALOG_CLOSE_DEBOUNCE_MS = 100

const TldPage = () => {
  const [open, setOpen] = React.useState(true)
  const navigate = useNavigate({ from: '/tld/$tld' })

  const params = Route.useParams()

  const ianaQuery = useTlds()
  const tld = ianaQuery.data?.tlds.find(tld => {
    return (
      (tld.punycode ?? tld.unicode).toLowerCase() === params.tld.toLowerCase()
    )
  })
  const tldQuery = useIfDefined(useTld, tld?.punycode ?? tld?.unicode)

  if (!tld) return

  const tldType = tldQuery?.data?.type?.replaceAll(/[()]/g, '')

  const slug = (tld.punycode ?? tld.unicode).toLowerCase()
  const databaseUri = new URL(`${slug}.html`, IANA_DB)

  const onOpenChange = async () => {
    setOpen(false)
    await new Promise(resolve => setTimeout(resolve, DIALOG_CLOSE_DEBOUNCE_MS))

    // TODO: when navigating from dialog -> tld , dialog -> tld ...
    // we will have 1...Infinite occurances of /tld route in the stack
    navigate({ to: '/tld', replace: true })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{tld.unicode}</DialogTitle>
          <DialogDescription asChild>
            <div>
              <section>{tldType && <Badge as="span">{tldType}</Badge>}</section>
              View this top level domain in the{' '}
              <Anchor
                target="_blank"
                rel="noopener noreferrer"
                href={databaseUri.toString()}
                data-punycode={!!tld.punycode}
              >
                root
              </Anchor>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export const Route = createFileRoute('/tld/$tld')({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(tldsOptions)
  },
  component: TldPage,
})

import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AlertTriangle } from 'lucide-react'
import React from 'react'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Anchor } from '~/components/ui/link'
import { Paragraph } from '~/components/ui/typography'
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

  const article = tldQuery?.data

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
              <header className="pb-2">
                View this top level domain in the{' '}
                <Anchor
                  target="_blank"
                  rel="noopener noreferrer"
                  href={databaseUri.toString()}
                  data-punycode={!!tld.punycode}
                >
                  root
                </Anchor>
              </header>
              {tldQuery?.isLoading && (
                <Paragraph>Fetching data from Iana...</Paragraph>
              )}
              {tldQuery?.isError && (
                <Alert variant="destructive">
                  <AlertTriangle className="w-4 h-4" />
                  <AlertTitle>Request to Iana failed</AlertTitle>
                  <AlertDescription>
                    `{tldQuery?.error.message}` Try again or try the link above
                  </AlertDescription>
                </Alert>
              )}
              {article && (
                <article
                  className="prose dark:prose-invert max-h-[500px] overflow-auto prose-headings:mt-4"
                  dangerouslySetInnerHTML={{ __html: article }}
                />
              )}
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

import { createFileRoute, useRouter } from '@tanstack/react-router'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { IANA_DB } from '~/constants'
import { tldsOptions, useTlds } from '~/services/iana'

// How long to wait before navigating to previous screen upon
// Dialog being closed; when zero no close animation for dialog
const DIALOG_CLOSE_DEBOUNCE_MS = 100

const TldPage = () => {
  const [open, setOpen] = React.useState(true)
  const router = useRouter()
  const params = Route.useParams()

  const ianaQuery = useTlds()
  const tld = ianaQuery.data?.tlds.find(tld => {
    return (
      (tld.punycode ?? tld.unicode).toLowerCase() === params.tld.toLowerCase()
    )
  })

  if (!tld) return

  const slug = (tld.punycode ?? tld.unicode).toLowerCase()
  const databaseUri = new URL(`${slug}.html`, IANA_DB)

  const onOpenChange = async () => {
    setOpen(false)
    await new Promise(resolve => setTimeout(resolve, DIALOG_CLOSE_DEBOUNCE_MS))

    router.history.back()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{tld.unicode}</DialogTitle>
          <DialogDescription>
            View this top level domain in the{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={databaseUri.toString()}
              data-punycode={!!tld.punycode}
            >
              root
            </a>
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

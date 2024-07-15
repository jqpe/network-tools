import { createFileRoute, useRouter } from '@tanstack/react-router'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { IANA_DB } from '~/constants'
import { ianaOptions, useIana } from '~/services/iana'

const TldPage = () => {
  const router = useRouter()
  const params = Route.useParams()

  const ianaQuery = useIana()
  const tld = ianaQuery.data?.tlds.find(tld => {
    return (
      (tld.punycode ?? tld.unicode).toLowerCase() === params.tld.toLowerCase()
    )
  })

  if (!tld) return

  const slug = (tld.punycode ?? tld.unicode).toLowerCase()
  const databaseUri = new URL(`${slug}.html`, IANA_DB)

  return (
    <Dialog open onOpenChange={() => router.history.replace('/tld')}>
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
    return queryClient.ensureQueryData(ianaOptions)
  },
  component: TldPage,
})

import { createFileRoute, ErrorComponentProps } from '@tanstack/react-router'
import { Network } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { Anchor } from '~/components/ui/link'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { H2, H3 } from '~/components/ui/typography'
import { Nameservers } from '~/components/whois/nameserver'
import { Status } from '~/components/whois/status'
import { useWhois, whoisOptions } from '~/services/rdap'

const WhoisPageError = ({ error }: ErrorComponentProps) => {
  if (/unable to find tld/i.test(error.message)) {
    return (
      <Alert variant="destructive" className="my-4">
        <Network className="h-4 w-4" />
        <AlertTitle>Domain could not be resolved</AlertTitle>
        <AlertDescription className="mt-2">
          There is no known rdap service for the domain, if the formatting is
          correct, look the domain up on an alternative service like{' '}
          <Anchor
            target="_blank"
            rel="noreferrer noopener"
            href="https://who.is/"
          >
            who.is
          </Anchor>
        </AlertDescription>
      </Alert>
    )
  }

  return error.message
}

const WhoisPage = () => {
  const { domain } = Route.useParams()
  const whoisQuery = useWhois(domain)
  const whois = whoisQuery.data

  return (
    <article className="mt-4">
      <H2 className="text-lg">
        Whois information for {whois.ldhName ?? domain}
      </H2>

      <Table>
        <TableCaption className="sr-only">Events for {domain}</TableCaption>
        <TableHeader className="sr-only">
          <TableRow>
            <TableHead>Action</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {whois.events.map(event => {
            return (
              <TableRow key={event.eventAction}>
                <TableCell>{event.eventAction}</TableCell>
                <TableCell>
                  {new Date(event.eventDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <section id="nameservers">
        <H3 className="text-lg">Nameservers</H3>
        <Nameservers nameservers={whois.nameservers} />
      </section>

      <section id="status">
        <H3 className="text-lg">Status</H3>
        <Status status={whois.status} />
      </section>
    </article>
  )
}

export const Route = createFileRoute('/whois/$domain')({
  errorComponent: WhoisPageError,
  loader: ({ context: { queryClient }, params }) => {
    return queryClient.ensureQueryData(whoisOptions(params.domain))
  },
  component: WhoisPage,
})

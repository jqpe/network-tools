import { createFileRoute } from '@tanstack/react-router'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { H2 } from '~/components/ui/typography'
import { useWhois, whoisOptions } from '~/services/rdap'

const WhoisPage = () => {
  const { domain } = Route.useParams()
  const { data: whois } = useWhois(domain)

  console.log(whois)

  return (
    <article className="mt-4">
      <H2 className="text-lg">Whois information for {whois.ldhName}</H2>

      <Table>
        <TableCaption>Events for {domain}</TableCaption>
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
    </article>
  )
}

export const Route = createFileRoute('/whois/$domain')({
  loader: ({ context: { queryClient }, params }) => {
    return queryClient.ensureQueryData(whoisOptions(params.domain))
  },
  component: WhoisPage,
})

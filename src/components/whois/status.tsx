import { List } from '~/components/ui/typography.tsx'
import { MissingDataAlert } from '~/components/whois'

export const Status = <T extends string>(props: { status: T[] }) => {
  const { status } = props

  if (!status) {
    return <MissingDataAlert title={'Database did not return status'} />
  }

  return <List>{status?.map(status => <li key={status}>{status}</li>)}</List>
}

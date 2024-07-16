import { List } from '~/components/ui/typography'
import { MissingDataAlert } from '~/components/whois'

interface Nameserver {
  ldhName?: string
  unicodeName?: string
}

export const Nameservers = <T extends Nameserver = never>(props: {
  nameservers: T[]
}) => {
  const { nameservers } = props

  if (!nameservers) {
    return (
      <MissingDataAlert
        title={`Database did not return nameservers for {domain}`}
      />
    )
  }

  return (
    <List>
      {nameservers?.map(ns => {
        const name = ns.ldhName?.toLowerCase() ?? ns.unicodeName

        return <li key={name}>{name}</li>
      })}
    </List>
  )
}

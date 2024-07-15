import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import tlds from '~/../public/tlds.json'

function trimSlash(input: string) {
  return input.endsWith('/') ? input.slice(0, -1) : input
}

function findRDAPUrl(domain: string) {
  const tld = domain.split('.')[domain.split('.').length - 1]
  if (!tld || tld === '') {
    throw new Error('Error parsing domain')
  }

  const foundTld = tlds.find(i => i[0].find(j => j === tld))
  if (!foundTld) {
    throw new Error(`Unable to find tld ${tld}`)
  }
  const rdapUrl = trimSlash(foundTld[1][0])
  return rdapUrl
}

export const whoisService = {
  whois: async (domain: string) => {
    let strippedDomain = domain.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
    strippedDomain = trimSlash(strippedDomain)
    const rdapUrl = findRDAPUrl(strippedDomain)
    const requestUrl = `${rdapUrl}/domain/${strippedDomain}`
    const response = await fetch(requestUrl)
    const data = await response.json()

    if (!data || typeof data !== 'object') {
      throw new Error(`Error making WHOIS request for domain: ${domain}`)
    }

    return data
  },
}

export const whoisOptions = (domain: string) =>
  queryOptions({
    queryKey: ['whois'],
    queryFn: () => whoisService.whois(domain),
    staleTime: Infinity,
  })
export const useWhois = (domain: string) =>
  useSuspenseQuery(whoisOptions(domain))

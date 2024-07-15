import { useQuery as useSuspenseQuery } from '@tanstack/react-query'
import punycode from 'punycode'
import { TLD_LIST_URI } from '~/constants'
import { IanaResponse, IanaTld } from '~/types/iana'
import { queryOptions } from '@tanstack/react-query'

export const ianaService = {
  getTlds: async (): Promise<IanaResponse> => {
    const response = await fetch(TLD_LIST_URI)
    const text = await response.text()
    // line 0 = header with version and date
    // line 1... = tld
    const lines = text.split('\n')

    const dateMatch = lines[0].match(/Updated (.+)/)

    // Second element in match array is capture group
    if (!dateMatch || !dateMatch.at(1)) {
      throw new Error('Invalid response format')
    }

    const updatedAt = new Date(dateMatch[1])
    const tlds = lines.slice(1, -1).map(tld => {
      const regex = /^xn--/i
      const isPunycode = tld.match(regex)

      const unicode = isPunycode ? punycode.decode(tld.replace(regex, '')) : tld

      return {
        unicode: unicode.toLocaleLowerCase(),
        punycode: isPunycode ? tld : undefined,
      } satisfies IanaTld
    })

    return { updatedAt, tlds }
  },
}

export const ianaOptions = queryOptions({
  queryKey: ['iana-tlds'],
  queryFn: ianaService.getTlds,
  staleTime: Infinity,
})

export const useIana = () => useSuspenseQuery(ianaOptions)

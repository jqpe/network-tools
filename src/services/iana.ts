import {
  queryOptions,
  useQuery as useSuspenseQuery,
} from '@tanstack/react-query'
import punycode from 'punycode'
import { IANA_DB, TLD_LIST_URI } from '~/constants'
import { IanaResponse, IanaTld } from '~/types/iana'

export const parseDelegationRecordPage = (html: string) => {
  const parser = new DOMParser()
  const document = parser.parseFromString(html, 'text/html')

  const article = document.querySelector<HTMLDivElement>('article > main')

  let isGTLD = /(Generic top-level domain)/.test(
    article?.querySelector('p')?.textContent ?? ''
  )

  return {
    /**
     * Is this TLD part of the Generic top level domain program?
     * @see https://en.wikipedia.org/wiki/Generic_top-level_domain
     */
    isGTLD,
  }
}

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
  getTld: async (tld: string) => {
    const response = await fetch(new URL(`${tld.toLowerCase()}.html`, IANA_DB))
    const text = await response.text()

    return parseDelegationRecordPage(text)
  },
}

export const tldsOptions = queryOptions({
  queryKey: ['iana-tlds'],
  queryFn: ianaService.getTlds,
  staleTime: Infinity,
})

export const tldOptions = (tld: string) =>
  queryOptions({
    queryKey: ['iana-tlds', tld],
    queryFn: () => ianaService.getTld(tld),
    staleTime: Infinity,
  })

export const useTlds = () => useSuspenseQuery(tldsOptions)
export const useTld = (tld: string) => useSuspenseQuery(tldOptions(tld))

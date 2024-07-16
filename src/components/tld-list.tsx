import { Link } from '~/components/ui/link.tsx'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import React, { memo } from 'react'
import { List, Text } from '~/components/ui/typography'
import { IanaTld } from '~/types/iana.ts'

interface Props {
  tlds: IanaTld[]
  filter: (tld: IanaTld) => boolean
}

type TldList = (props: Props) => JSX.Element

export const TldList = memo<TldList>(function TldList({ tlds, filter }) {
  const listRef = React.useRef<HTMLDivElement>(null)
  const shownTlds = tlds.filter(filter)

  const virtualizer = useWindowVirtualizer({
    count: shownTlds.length,
    scrollMargin: listRef.current?.offsetTop ?? 0,
    // link height
    estimateSize: () => 19,
    overscan: 5,
    gap: 16,
  })

  return (
    <>
      <Text className="text-foreground/70 text-xs mt-2">
        Showing {shownTlds.length}/{tlds.length} top-level domains
      </Text>
      <div ref={listRef}>
        <List
          className="relative"
          style={{ height: `${virtualizer.getTotalSize()}px` }}
        >
          {virtualizer.getVirtualItems().map(item => {
            const { index, start, key, size } = item

            const { unicode, punycode } = shownTlds[index]

            return (
              <li
                className="absolute top-0 left-0 w-full"
                key={key}
                style={{
                  height: `${size}px`,
                  transform: `translateY(${start - virtualizer.options.scrollMargin}px)`,
                }}
              >
                <Link to="/tld/$tld" params={{ tld: punycode ?? unicode }}>
                  {unicode}
                </Link>
              </li>
            )
          })}
        </List>
      </div>
    </>
  )
})

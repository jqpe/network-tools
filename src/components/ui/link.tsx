import { createLink } from '@tanstack/react-router'
import { cn } from '~/utils'

const LinkStyles = (props: JSX.IntrinsicElements['a']) => {
  return <a {...props} className={cn('underline', props.className)} />
}

export const Link = createLink(LinkStyles)
export const Anchor = LinkStyles

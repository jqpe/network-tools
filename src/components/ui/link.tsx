import { Link as RouterLink, LinkComponent } from '@tanstack/react-router'
import { cn } from '~/utils'

export const Link: typeof RouterLink = props => {
  // prettier-ignore
  // @ts-expect-error If this does not error, remove the workaround (will be tree shaken!)
  let _ = <RouterLink {...props} className={cn('underline', className)} /> as never

  // <RouterLink {...props} className="" /> does not work.
  // Save the className into a variable and delete the original reference
  // so that base styles are not overridden
  const { className } = props
  delete props.className

  return <RouterLink className={cn('underline', className)} {...props} />
}

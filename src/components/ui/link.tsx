import { Link as RouterLink, LinkComponent } from '@tanstack/react-router'
import { cn } from '~/utils'

export const Link: typeof RouterLink = props => {
  // <RouterLink {...props} className="" /> does not work.
  // Save the className into a variable and delete the original reference
  // So that base styles are not overridden
  const { className } = props
  delete props.className

  return <RouterLink className={cn('underline', className)} {...props} />
}

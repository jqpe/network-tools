import { cn } from '~/utils'

export const Input = (props: JSX.IntrinsicElements['input']) => {
  return (
    <input
      {...props}
      className={cn(
        'block shadow-md border rounded-md my-1 px-2 py-0.5 w-full',
        'dark:bg-card text-foreground placeholder:text-foreground/50',
        props.className
      )}
    />
  )
}

import { cn } from '~/utils'

export const Input = (props: JSX.IntrinsicElements['input']) => {
  return (
    <input
      {...props}
      className={cn(
        'block border-slate-50 shadow-md border-2 rounded-md my-1 px-2 py-0.5 w-full',
        'dark:border-slate-700 dark:bg-slate-800 text-foreground placeholder:text-foreground/50',
        props.className
      )}
    />
  )
}

import { cva, VariantProps } from 'cva'
import { cn } from '~/utils'

export const H1 = (props: JSX.IntrinsicElements['h1']) => {
  return (
    <h1
      {...props}
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        props.className
      )}
    />
  )
}

export const H2 = (props: JSX.IntrinsicElements['h2']) => {
  return (
    <h2
      {...props}
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        props.className
      )}
    />
  )
}

export const H3 = (props: JSX.IntrinsicElements['h3']) => {
  return (
    <h3
      {...props}
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        props.className
      )}
    />
  )
}

export const H4 = (props: JSX.IntrinsicElements['h4']) => {
  return (
    <h4
      {...props}
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        'dark:text-foreground',
        props.className
      )}
    />
  )
}

export const Paragraph = (props: JSX.IntrinsicElements['p']) => {
  return (
    <p
      {...props}
      className={cn('leading-7 [:not(:first-child)]:mt-6', props.className)}
    />
  )
}

export const Text = (props: JSX.IntrinsicElements['span']) => {
  return <span {...props} className={cn('leading-5 block', props.className)} />
}

export const Blockquote = (props: JSX.IntrinsicElements['blockquote']) => {
  return (
    <blockquote
      {...props}
      className={cn('mt-6 border-l-2 pl-6 italic"', props.className)}
    />
  )
}

const list = cva({
  base: 'my-4 [&>li]:mt-2',
  variants: {
    variant: {
      markers: 'list-disc ml-6',
    },
  },
})

export const List = (
  props: JSX.IntrinsicElements['ul'] & VariantProps<typeof list>
) => {
  return (
    <ul
      {...props}
      className={list({ variant: props.variant, className: props.className })}
    />
  )
}

export const Code = (props: JSX.IntrinsicElements['code']) => {
  return (
    <code
      {...props}
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        'dark:text-foreground',
        props.className
      )}
    />
  )
}

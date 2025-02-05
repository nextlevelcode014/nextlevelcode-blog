import { HTMLAttributes } from 'react'

export default function H2(
  props: HTMLAttributes<HTMLHeadingElement>,
  className?: string
) {
  return (
    <h2
      className={className || 'responsive-reading text-2xl font-semibold mb-4'}
      {...props}
    />
  )
}

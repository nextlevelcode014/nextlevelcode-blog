import { HTMLAttributes } from 'react'

export default function Div(
  props: HTMLAttributes<HTMLDivElement>,
  className?: string
) {
  return <div className={className || "flex flex-col min-h-screen"} {...props} />
}

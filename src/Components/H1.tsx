import { HTMLAttributes } from 'react'

export default function H1(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 className="responsive-reading text-4xl font-bold mb-4" {...props} />
  )
}

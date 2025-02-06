export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  return (
    <article>
      <h1>{slug}</h1>
    </article>
  )
}

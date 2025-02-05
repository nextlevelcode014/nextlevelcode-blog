export function Video({ src }: { src: string }) {
  return (
    <video
      className="mt-2 mb-4"
      width="800"
      height="400"
      controls
      preload="none"
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

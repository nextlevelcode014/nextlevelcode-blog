import { HeaderPost } from "@/components/HeaderPost";
import { SanityLive } from "@/sanity/lib/live";

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="bg-white min-h-screen">
      <HeaderPost />
      {children}
      <SanityLive />
    </section>
  );
}

import Link from "next/link";

export default function MyLink({ href, name }: { href: string, name: string }) {
  return <Link className="font-bold text-blue-500 underline" href={href}  target="_blank" rel="noopener noreferrer" >{name}</Link>;
}
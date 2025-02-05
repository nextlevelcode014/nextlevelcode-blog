import { ReactNode } from "react";

export default function Nav({ children }: { children: ReactNode }) {
  return <nav className="flex gap-6">{children}</nav>
}
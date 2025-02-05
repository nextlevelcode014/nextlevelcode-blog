import { ReactNode } from "react";

export default function Main({ children }: { children: ReactNode }) {
  return <main className="container max-w-[800px] mx-auto p-4 flex-grow">{children}</main>
}
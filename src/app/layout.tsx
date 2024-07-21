import "@/styles/globals.css"
import { Metadata } from "next"
import Link from "next/link"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: {
    default: "CLOcate",
    template: "%s | CLOcate",
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="flex gap-4 border-b-2 border-slate-500 p-4 text-2xl">
          <Link href="/">Home</Link>
          <Link href="/new">New</Link>
          <Link href="/search">Search</Link>
        </nav>

        <main className="mx-auto my-8 w-4/5">{children}</main>
      </body>
    </html>
  )
}

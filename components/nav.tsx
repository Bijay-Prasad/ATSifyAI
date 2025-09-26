"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const links = [
  { href: "/home", label: "Home" },
  { href: "/upload", label: "Upload" },
  { href: "/auth", label: "Auth" },
]

export function Nav() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/home" className="font-semibold text-pretty">
          <span className="text-foreground">ATS</span>
          <span className="ml-1 rounded-md bg-primary px-2 py-0.5 text-sm text-primary-foreground">AI</span>
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-foreground transition-colors",
                pathname === l.href && "bg-muted text-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}

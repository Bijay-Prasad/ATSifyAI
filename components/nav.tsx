"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { usePuterStore } from "@/lib/puter";
import { LogIn, LogOut } from "lucide-react";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

const links = [
  { href: "/home", label: "Home" },
  { href: "/upload", label: "Upload" },
];

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { auth } = usePuterStore();

  const handleAuthClick = async () => {
    if (auth.isAuthenticated) {
      await auth.signOut();
      router.push("/");
    } else {
      // await auth.signIn();
      // router.push(pathname);
      pathname == "/auth" ? router.push(`/auth?next=/`) :  router.push(`/auth?next=${pathname}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/home" className="font-semibold text-pretty">
          <span className="text-foreground">ATSify</span>
          <span className="ml-1 rounded-md bg-primary px-2 py-0.5 text-sm text-primary-foreground">
            AI
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-foreground transition-colors",
                pathname === l.href && "bg-muted text-foreground"
              )}
            >
              {l.label}
            </Link>
          ))}
          <Button variant="outline" className="ml-2" onClick={handleAuthClick}>
            {auth.isAuthenticated ? (
              <LogOut className="h-5 w-5 cursor-pointer" />
            ) : (
              <LogIn className="h-5 w-5 cursor-pointer" />
            )}
          </Button>
          <div className="ml-2 flex justify-between items-center">
            {/* <ThemeToggle /> */}
            <AnimatedThemeToggler duration={500} className="text-foreground/80 hover:text-foreground cursor-pointer"/>
          </div>
        </nav>
      </div>
    </header>
  );
}

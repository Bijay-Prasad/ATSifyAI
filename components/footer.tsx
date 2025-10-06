"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePuterStore } from "@/lib/puter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import { IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react";

export function Footer() {
  // const { isLoading, auth } = usePuterStore();
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const next = searchParams.get("next") || "/";

  // console.log("Footer searchParams:", searchParams);
  // console.log("Footer nezt:", next);

  const pathname = usePathname();
  const router = useRouter();
  const { auth } = usePuterStore();

  // console.log("Footer pathname:", pathname);

  const handleAuthClick = async () => {
    if (auth.isAuthenticated) {
      await auth.signOut();
      router.push("/home");
    } else {
      await auth.signIn();
      router.push(pathname);
    }
  };

  return (
    <footer className="border-t border-border/50 mt-16">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4 text-center md:text-left">
            <Link href="/home" className="font-semibold text-pretty">
              <span className="text-foreground">ATSify</span>
              <span className="ml-1 rounded-md bg-primary px-2 py-0.5 text-sm text-primary-foreground">
                AI
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              AI-powered resume analysis and ATS optimization to help you land
              your dream job.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="font-medium text-foreground">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/upload"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Upload Resume
                </Link>
              </li>
              <li>
                <Link
                  href="/home"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href={
                    auth.isAuthenticated
                      ? `/auth?next=/`
                      : `/auth?next=${pathname}`
                  }
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={handleAuthClick}
                >
                  {auth.isAuthenticated ? "Sign Out" : "Sign In"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="font-medium text-foreground">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Settings */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="font-medium text-foreground">Settings</h3>
            <div className="flex justify-center md:justify-start items-center gap-2">
              <span className="text-sm text-muted-foreground">Theme</span>
              {/* <ThemeToggle /> */}
              <AnimatedThemeToggler
                duration={500}
                className="text-foreground/80 hover:text-foreground cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 ATSify AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Support
            </a>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a
              href="https://x.com/Wannabe_01_"
              className="hover:text-foreground transition-colors"
            >
              <IconBrandTwitter />
            </a>
            <a
              href="https://github.com/Bijay-Prasad"
              className="hover:text-foreground transition-colors"
            >
              <IconBrandGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

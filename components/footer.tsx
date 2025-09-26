"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export function Footer() {
  return (
    <footer className="border-t border-border/50 mt-16">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/home" className="font-semibold text-pretty">
              <span className="text-foreground">ATS</span>
              <span className="ml-1 rounded-md bg-primary px-2 py-0.5 text-sm text-primary-foreground">AI</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              AI-powered resume analysis and ATS optimization to help you land your dream job.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/upload" className="text-muted-foreground hover:text-foreground transition-colors">
                  Upload Resume
                </Link>
              </li>
              <li>
                <Link href="/home" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/auth" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Settings</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2025 ATS AI. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

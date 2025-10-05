import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { AnimatedGradient } from "@/components/animated-gradient";
import { Footer } from "@/components/footer";
import { Suspense } from "react";
import { PuterInitClient } from "@/components/puter-init-client";

export const metadata: Metadata = {
  title: "ATSify AI",
  description: "Created with v0",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>
            <AnimatedGradient />
            <Nav />
            <PuterInitClient />
            <main className="relative mx-auto max-w-6xl px-4 py-8 md:py-10">
              <script src="https://js.puter.com/v2/"></script>
              {children}
            </main>
            <Footer />
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}

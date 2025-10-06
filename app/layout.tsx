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
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "ATSify AI | An AI-powered Resume Analyzer",
  description: "An AI-powered Resume Analyzer. ATS ko karo beat, interview ki seat!",
  generator: "Built with Nextjs and Puter by Bijay Prasad",
  icons: {
    icon: "/favicon.svg",
    // Optional: Add other icon sizes and types
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const puterApiUrl = process.env.NEXT_PUBLIC_PUTER_API_URL;
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
              <script src={puterApiUrl}></script>
              {children}
            </main>
            <Footer />
            <Analytics />
          </Suspense>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}

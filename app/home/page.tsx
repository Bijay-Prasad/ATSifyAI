"use client"

import { motion } from "framer-motion"
import { ResumeCard } from "@/components/resume-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const items = [
    { title: "Resume - Product Manager", score: 82, role: "Product Manager", date: "Sep 2025" },
    { title: "Resume - Frontend Dev", score: 67, role: "Frontend Developer", date: "Sep 2025" },
    { title: "Resume - Data Analyst", score: 54, role: "Data Analyst", date: "Aug 2025" },
  ]

  return (
    <div className="space-y-8">
      <section className="grid items-center gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-balance text-3xl font-semibold leading-tight md:text-4xl"
          >
            Track your AI-powered ATS insights
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="max-w-prose text-pretty text-muted-foreground"
          >
            See previously analyzed resumes, scores, and tips—all in one place. Continue improving or start a new
            upload.
          </motion.p>
          <div className="flex gap-3">
            <Link href="/upload" className="cursor-pointer">
              <Button>Upload new resume</Button>
            </Link>
            <Link href="/auth">
              <Button variant="outline">Sign in</Button>
            </Link>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {items.map((it, i) => (
            <ResumeCard key={it.title} {...it} />
          ))}
        </motion.div>
      </section>
    </div>
  )
}

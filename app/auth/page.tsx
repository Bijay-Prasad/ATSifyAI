"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { AuthForm } from "@/components/auth-form"
import { motion } from "framer-motion"

export default function AuthPage() {
  const titleRef = useRef<HTMLHeadingElement>(null)

  // useLayoutEffect(() => {
  //   if (!titleRef.current) return
  //   const tl = gsap.timeline()
  //   tl.from(titleRef.current, { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" })
  //   return () => {
  //     tl.kill()
  //   }
  // }, [])

  async function login(values: { email: string; password: string }) {
    // console.log("[v0] Auth submit:", values)
  }

  return (
    <div className="grid min-h-[80vh] items-center gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <h1 ref={titleRef} className="text-balance text-3xl font-semibold leading-tight md:text-4xl">
          Check your resume ATS score with AI tips
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="max-w-prose text-pretty text-muted-foreground"
        >
          Upload your resume and job description. Get instant, actionable insights to improve your match rate.
        </motion.p>
      </div>
      <AuthForm onSubmit={login as any} />
    </div>
  )
}

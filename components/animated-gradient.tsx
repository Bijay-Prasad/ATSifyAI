"use client"

import { motion } from "framer-motion"

export function AnimatedGradient() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Subtle base gradient using theme tokens (no raw colors) */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_0%,var(--color-muted),transparent_60%)] dark:bg-[radial-gradient(1200px_600px_at_20%_0%,var(--color-secondary),transparent_60%)]" />
      {/* Animated blobs */}
      <motion.div
        className="absolute -top-24 -left-24 h-[38rem] w-[38rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--color-primary) 0%, transparent 70%)", opacity: 0.18 }}
        animate={{ x: [0, 40, -20, 0], y: [0, 20, -10, 0], scale: [1, 1.05, 0.98, 1] }}
        transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-24 -right-24 h-[32rem] w-[32rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--color-chart-2) 0%, transparent 70%)", opacity: 0.18 }}
        animate={{ x: [0, -30, 10, 0], y: [0, -15, 8, 0], scale: [1, 0.97, 1.04, 1] }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.2 }}
      />
    </div>
  )
}

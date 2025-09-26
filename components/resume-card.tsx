"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"

export function ResumeCard({
  title,
  score,
  role,
  date,
  id = "1", // Default ID for demo purposes
}: {
  title: string
  score: number
  role: string
  date: string
  id?: string
}) {
  const color =
    score >= 80
      ? "text-green-600 dark:text-green-400"
      : score >= 60
        ? "text-amber-600 dark:text-amber-400"
        : "text-red-600 dark:text-red-400"

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}>
      <Link href={`/review/${id}`}>
        <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-pretty">{title}</CardTitle>
            <CardDescription className="text-pretty">
              {role} • {date}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">ATS Score</p>
            <p className={`text-3xl font-semibold ${color}`}>{score}%</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

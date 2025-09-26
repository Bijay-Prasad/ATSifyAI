"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { usePuterStore } from "@/lib/puter";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const { auth } = usePuterStore();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuthenticated) router.push("/auth?next=/upload");
  }, [auth.isAuthenticated]);

  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState("");
  const [file, setFile] = useState<File | null>(null);

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      // console.log("[v0] Analyze submit:", { job, file })
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-balance">Upload resume</CardTitle>
          <CardDescription className="text-pretty">
            Provide a job description and your resume to get an ATS score and
            tailored suggestions.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleAnalyze}>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="job">Job description</Label>
              <Textarea
                id="job"
                placeholder="Paste the role’s responsibilities, requirements, and key skills..."
                className="min-h-40"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="resume">Resume file (PDF/DOCX)</Label>
              <Input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                required
              />
            </div>
            <Separator />
          </CardContent>
          <CardFooter className="flex items-center gap-3">
            <Button type="submit" disabled={loading}>
              {loading ? "Analyzing..." : "Analyze"}
            </Button>
            <span className="text-xs text-muted-foreground">
              We’ll never store your documents without consent.
            </span>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}

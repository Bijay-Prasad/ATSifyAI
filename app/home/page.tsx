"use client";

import { motion } from "framer-motion";
import { ResumeCard } from "@/components/resume-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { usePuterStore } from "@/lib/puter";
import { Loader2 } from "lucide-react";
import { Meteors } from "@/components/ui/meteors";

export default function HomePage() {
  const items = [
    {
      id: "1",
      title: "Google",
      score: 82,
      role: "Product Manager",
      date: "Sep 2025",
    },
    {
      id: "2",
      title: "Microsoft",
      score: 67,
      role: "Software Engineer",
      date: "Sep 2025",
    },
    {
      id: "3",
      title: "Apple",
      score: 54,
      role: "iOS Developer",
      date: "Aug 2025",
    },
  ];

  const { auth, kv } = usePuterStore();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  useEffect(() => {
    if (auth.isAuthenticated) {
      const loadResumes = async () => {
        setLoadingResumes(true);

        const resumes = (await kv.list("resume:*", true)) as KVItem[];

        // console.log("Raw resumes from KV:", resumes);

        const parsedResumes = resumes?.map(
          (resume) => JSON.parse(resume.value) as Resume
        );

        // console.log("Loaded resumes from KV:", { resumes, parsedResumes });

        setResumes(parsedResumes || []);
        setLoadingResumes(false);
      };

      loadResumes();
    }
  }, [auth.isAuthenticated]);

  // console.log({ resumes, loadingResumes });

  return (
    <div className="space-y-8 md:min-h-[39vh] ">
      <section className="grid items-center gap-6 md:grid-cols-2 ">
        <Meteors/>
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
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-prose text-pretty text-muted-foreground"
          >
            See previously analyzed resumes, scores, and tips—all in one place.
            Continue improving or start a new upload.
          </motion.p>
          <div className="flex gap-3">
            <Link href="/upload" className="cursor-pointer">
              <Button>Upload new resume</Button>
            </Link>
            {!auth.isAuthenticated && (
              <Link href="/auth">
                <Button variant="outline">Sign in</Button>
              </Link>
            )}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {auth.isAuthenticated && loadingResumes ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          ) : auth.isAuthenticated && resumes.length > 0 ? (
            resumes.map((it, i) => (
              <ResumeCard
                key={it.id}
                id={it.id}
                title={it.companyName || ""}
                score={it.feedback.overallScore}
                role={it.jobTitle || ""}
                date={it.resumeDate || ""}
              />
            ))
          ) : (
            items.map((it, i) => <ResumeCard key={it.id} {...it} />)
          )}
        </motion.div>
      </section>
    </div>
  );
}

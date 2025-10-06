"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { AuthForm } from "@/components/auth-form";
import { motion } from "framer-motion";
import { usePuterStore } from "@/lib/puter";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { WordRotate } from "@/components/ui/word-rotate";
import { Meteors } from "@/components/ui/meteors";
import { SparklesText } from "@/components/ui/sparkles-text";
import { TextAnimate } from "@/components/ui/text-animate";

export default function AuthPage() {
  const { isLoading, auth } = usePuterStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  useEffect(() => {
    if (auth.isAuthenticated) router.push(next);
  }, [auth.isAuthenticated, next, router]);

  console.log("isLoading", isLoading);
  console.log("next", next);

  const titleRef = useRef<HTMLHeadingElement>(null);

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
        <h1
          className="text-balance text-3xl font-semibold leading-tight md:text-4xl"
        >
          <TextAnimate>Check your resume ATS score with AI tips</TextAnimate>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-prose text-pretty text-muted-foreground"
        >
          Upload your resume and job description. Get instant, actionable
          insights to improve your match rate.
        </motion.p>
      </div>
      {/* <AuthForm onSubmit={login as any} /> */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="mx-auto w-full max-w-md border-border/60 bg-card/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-balance">Welcome back</CardTitle>
            <CardDescription className="text-pretty">
              Log in to check your resume’s ATS score and get tips.
            </CardDescription>
          </CardHeader>
          {/* <form onSubmit={handleSubmit}> */}
          <CardContent className="space-y-4">
            <SparklesText className="text-4xl flex justify-center items-center" sparklesCount={8}>ATSify AI</SparklesText>
            <WordRotate words={["An AI-powered Resume Analyzer.", "ATS ko karo beat, interview ki seat!"]} className="flex justify-center items-center"/>
            <Separator />
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            {isLoading ? (
              <Button className="w-full" disabled={isLoading}>
                Signing in...
              </Button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <Button className="w-full" onClick={auth.signOut}>
                    Sign Out
                  </Button>
                ) : (
                  <Button className="w-full" onClick={auth.signIn}>
                    Sign In
                  </Button>
                )}
              </>
            )}
            <p className="text-center text-xs text-muted-foreground">
              By continuing, you agree to our Terms and Privacy Policy.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

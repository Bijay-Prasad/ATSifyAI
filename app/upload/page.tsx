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
import { convertPdfToImage } from "@/lib/pdf2img";
import { generateUUID } from "@/lib/utils";
import { prepareInstructions } from "@/constants";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { usePageTitle } from "@/hooks/use-PageTitle";


const loadingStates = [
  { text: "Uploading the file..." },
  { text: "Converting to image..." },
  { text: "Uploading the image..." },
  { text: "Preparing data..." },
  { text: "Analyzing..." },
  { text: "Analysis complete, redirecting..." }
];

export default function UploadPage() {
  usePageTitle(`ATSify AI - Upload Resume`);
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuthenticated) router.push("/auth?next=/upload");
  }, [auth.isAuthenticated]);

  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const idx = loadingStates.findIndex(state => state.text === statusText);
    if (idx !== -1) {
      setCurrentStepIndex(idx);
      setError("");
    } else if (statusText && statusText.startsWith("Error:")) {
      setError(statusText);
      setTimeout(() => {
        setError("");
        setIsProcessing(false);
        setStatusText("");
        router.push("/upload");
      }, 3000);
    }
  }, [statusText]);

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    resumeDate,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    resumeDate: string;
    file: File;
  }) => {
    setIsProcessing(true);
    setCurrentStepIndex(0);

    setStatusText("Uploading the file...");
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatusText("Error: Failed to upload file");

    setStatusText("Converting to image...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file)
      return setStatusText("Error: Failed to convert PDF to image");

    setStatusText("Uploading the image...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatusText("Error: Failed to upload image");

    setStatusText("Preparing data...");
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      resumeDate,
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText("Analyzing...");
    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription })
    );
    if (!feedback) {
      return setError("Error: Failed to analyze resume");
    }
    if (
      typeof feedback === "object" &&
      feedback !== null &&
      "code" in feedback &&
      (feedback as any).code === "error_400_from_delegate"
    ) {
      return setError("Error: AI usage limit exceeded. Please try again later or upgrade your plan.");
    }

    let feedbackText;
    if (typeof feedback.message.content === "string") {
      feedbackText = feedback.message.content;
    } else if (Array.isArray(feedback.message.content) && feedback.message.content[0]?.text) {
      feedbackText = feedback.message.content[0].text;
    } else {
      return setError("Error: Invalid feedback format received");
    }

    try {
      data.feedback = JSON.parse(feedbackText);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Raw feedback text:", feedbackText);
      return setError("Error: Failed to parse AI feedback. Please try again.");
    }
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analysis complete, redirecting...");
    setTimeout(() => {
      router.push(`/review/${uuid}`);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return;

    const currentDate = new Date();
    const resumeDate = currentDate.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });
    // console.log("Current:", resumeDate);

    handleAnalyze({ companyName, jobTitle, jobDescription, resumeDate, file });
    // console.log({ companyName, jobTitle, jobDescription, resumeDate, file });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {isProcessing ? (
        error ? (
          <div className="flex flex-col items-center justify-center h-96">
            <div className="text-red-600 dark:text-red-400 text-lg font-semibold mb-4">{error}</div>
            <div className="text-sm text-muted-foreground">Redirecting to upload page...</div>
          </div>
        ) : (
          <MultiStepLoader
            loadingStates={loadingStates}
            loading={isProcessing}
            duration={2000}
            loop={false}
            value={currentStepIndex}
          />
        )
      ) : (
        <Card className="mx-auto w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-balance">Upload resume</CardTitle>
            <CardDescription className="text-pretty">
              Provide a job description and your resume to get an ATS score and
              tailored suggestions.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="company-name"
                  placeholder="Company name..."
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="job-title">Job Title</Label>
                <Input
                  id="job-title"
                  placeholder="Job title..."
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="job-description">Job description</Label>
                <Textarea
                  id="job-description"
                  placeholder="Paste the role’s responsibilities, requirements, and key skills..."
                  className="min-h-40"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
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
      )}
    </motion.div>
  );
}

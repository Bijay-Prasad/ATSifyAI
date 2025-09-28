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

// const loadingStates = [
//   {
//     text: "Buying a condo",
//   },
//   {
//     text: "Travelling in a flight",
//   },
//   {
//     text: "Meeting Tyler Durden",
//   },
//   {
//     text: "He makes soap",
//   },
//   {
//     text: "We goto a bar",
//   },
//   {
//     text: "Start a fight",
//   },
//   {
//     text: "We like it",
//   },
//   {
//     text: "Welcome to F**** C***",
//   },
// ];

export default function UploadPage() {
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
  const [loadingStates, setLoadingStates] = useState<{ text: string }[]>([]);
  const [statusText, setStatusText] = useState("");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // useEffect(() => {
  //   setLoadingStates(loadingStates.map((state, idx) =>
  //     idx === currentStepIndex ? { ...state, text: statusText } : state
  //   ));
  // }, [currentStepIndex]);

  // useEffect(() => {
  //   setLoadingStates(loadingStates.map((state, idx) =>
  //     idx === currentStepIndex ? { ...state, text: statusText } : state
  //   ));
  // }, [statusText]);

  // useEffect(() => {
  //   setLoadingStates(loadingStates.map((state, idx) =>
  //     idx === currentStepIndex ? { ...state, text: statusText } : state
  //   ));
  // }, [loadingStates]);

  const pushStatus = (text: string) => {
    setStatusText(text);
    setLoadingStates((prev) => [...prev, { text }]);
    setCurrentStepIndex((prev) => prev + 1);
  };

  // async function handleAnalyze(e: React.FormEvent) {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     console.log("[v0] Analyze submit:", { company, jobTitle, jobDescription, file });
  //     setCompany("");
  //     setJobTitle("");
  //     setJobDescription("");
  //     setFile(null);
  //     setLoading(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);
    setLoadingStates([]);
    setCurrentStepIndex(0);

    pushStatus("Uploading the file...");
    // setStatusText("Uploading the file...");
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatusText("Error: Failed to upload file");

    // setStatusText("Converting to image...");
    pushStatus("Converting to image...");
    const imageFile = await convertPdfToImage(file);
    console.log(imageFile);
    if (!imageFile.file)
      return setStatusText("Error: Failed to convert PDF to image");

    // setStatusText("Uploading the image...");
    pushStatus("Uploading the image...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatusText("Error: Failed to upload image");

    // setStatusText("Preparing data...");
    pushStatus("Preparing data...");
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    // setStatusText("Analyzing...");
    pushStatus("Analyzing...");

    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription })
    );
    if (!feedback) return setStatusText("Error: Failed to analyze resume");

    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    // setStatusText("Analysis complete, redirecting...");
    pushStatus("Analysis complete, redirecting...");
    // setCurrentStepIndex(5);
    console.log(data);
    // Wait 2 seconds before redirecting
    setTimeout(() => {
      router.push(`/review/${uuid}`);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return;

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
    console.log({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {isProcessing ? (
        // <>
        //   <h1>Smart feedback for your dream job</h1>
        //   <h2>{statusText}</h2>
        //   {/* <img src="/images/resume-scan.gif" className="w-full" /> */}
        // </>
        // <MultiStepLoader loadingStates={loadingStates.map((state, idx) =>
        //   idx === currentStepIndex ? { ...state, text: statusText } : state
        // )} loading={isProcessing} duration={2000} loop={false}/>
        <MultiStepLoader
          loadingStates={loadingStates}
          loading={isProcessing}
          duration={2000}
          loop={false}
          value={currentStepIndex - 1}
        />
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

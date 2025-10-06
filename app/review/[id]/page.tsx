"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { usePuterStore } from "@/lib/puter";
import { useEffect, useState } from "react";
import { ReviewSection } from "@/components/review-section";
import { ATSCard } from "@/components/ats-card";
import { Resume } from "@/components/resume";
import { usePageTitle } from "@/hooks/use-PageTitle";

// Mock data based on the Figma design
const mockReviewData = {
  id: "1",
  name: "Daniel Destefanis",
  title: "DevOps Engineer",
  overallScore: 88,
  sections: {
    toneStyle: {
      score: 95,
      status: "Good Start",
      color: "text-green-600 dark:text-green-400",
      items: [
        { text: "Professional tone maintained throughout", status: "good" },
        { text: "Clear and concise language", status: "good" },
        { text: "Action-oriented descriptions", status: "good" },
      ],
    },
    content: {
      score: 25,
      status: "Needs work",
      color: "text-red-600 dark:text-red-400",
      items: [
        { text: "Missing quantifiable achievements", status: "bad" },
        { text: "Lacks specific technical skills", status: "bad" },
        { text: "No mention of certifications", status: "warning" },
      ],
    },
    structure: {
      score: 70,
      status: "Strong",
      color: "text-blue-600 dark:text-blue-400",
      items: [
        { text: "Clear section organization", status: "good" },
        { text: "Consistent formatting", status: "good" },
        { text: "Could improve contact section", status: "warning" },
      ],
    },
    skills: {
      score: 32,
      status: "Needs work",
      color: "text-red-600 dark:text-red-400",
      items: [
        { text: "Limited technical skills listed", status: "bad" },
        { text: "Missing industry keywords", status: "bad" },
        { text: "No soft skills mentioned", status: "warning" },
      ],
    },
  },
  atsScore: 88,
  atsAnalysis: {
    keywordRelevance: "Clear formatting, readable by ATS",
    skillsDetected: "Keywords relevant to the job",
    noSkillsDetected: "No skills section detected",
  },
  improvements: [
    "Add quantifiable achievements with specific numbers",
    "Include more technical skills relevant to DevOps",
    "Add certifications and training",
    "Improve skills section formatting",
    "Include soft skills and leadership experience",
  ],
  experience: [
    {
      company: "Discord",
      role: "Design Manager - Discord",
      period: "Jan 2021 - Present",
      description:
        "Led design initiatives and managed a team of 5 designers, contributing to user experience improvements across the platform.",
    },
    {
      company: "Discord",
      role: "Senior Product Designer - Discord",
      period: "Mar 2019 - Jan 2021",
      description:
        "Designed key features for Discord's mobile and desktop applications, focusing on user engagement and retention.",
    },
  ],
};

const mockReviewData1 = [
  {
    id: "1",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "/resume-1.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "2",
    companyName: "Microsoft",
    jobTitle: "Cloud Engineer",
    imagePath: "/resume-2.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "3",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    imagePath: "/resume-3.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
];

export default function ReviewPage() {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [resumeDate, setResumeDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  usePageTitle(`ATSify AI - ${jobTitle} Resume Review`);

  const params = useParams();
  const id = params.id as string;
  // console.log("Resume Id:", id);

  useEffect(() => {
    if (auth.isAuthenticated) {
      const loadResume = async () => {
        setLoadingFeedback(true);
        const resume = await kv.get(`resume:${id}`);

        // console.log("resume", resume);

        if (!resume) {
          setLoadingFeedback(false);
          return;
        }

        const data = JSON.parse(resume);

        const resumeBlob = await fs.read(data.resumePath);
        if (resumeBlob) {
          const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
          const resumeUrl = URL.createObjectURL(pdfBlob);
          setResumeUrl(resumeUrl);
        }

        const imageBlob = await fs.read(data.imagePath);
        if (imageBlob) {
          const imageUrl = URL.createObjectURL(imageBlob);
          setImageUrl(imageUrl);
        }
        setCompanyName(data.companyName);
        setJobTitle(data.jobTitle);
        setResumeDate(data.resumeDate);
        setFeedback(data.feedback);
        setLoadingFeedback(false);
      };

      loadResume();
    } else {
      setLoadingFeedback(true);
      const local = mockReviewData1.find((r) => r.id === id);
      if (local) {
        setCompanyName(local.companyName);
        setJobTitle(local.jobTitle);
        setImageUrl(local.imagePath);
        setResumeUrl(local.resumePath);
        setFeedback(local.feedback as unknown as Feedback);
      }
      setLoadingFeedback(false);
    }
  }, [id, auth.isAuthenticated]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return (
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
        );
      case "bad":
        return <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />;
      case "warning":
        return (
          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        );
      default:
        return null;
    }
  };

  const color = (score: number) =>
    score > 69
      ? "text-green-600 dark:text-green-400"
      : score > 49
      ? "text-amber-600 dark:text-amber-400"
      : "text-red-600 dark:text-red-400";

  // console.log({ imageUrl, resumeUrl, feedback });

  if (loadingFeedback) {
    return (
      <div className="min-h-[39vh] flex items-center justify-center">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/home"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to homepage
        </Link>
        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
          <span className="capitalize">{jobTitle}</span>
          <span>•</span>
          <span>Resume Review</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Mobile: Review Data First */}
        <div className="lg:order-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-semibold mb-2">Resume Review</h1>

            {/* Overall Score Card */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Your Resume Score
                  <Badge
                    variant="secondary"
                    className={`text-lg px-3 py-1 ${color(
                      feedback?.overallScore as number
                    )}`}
                  >
                    {feedback?.overallScore}/100
                  </Badge>
                </CardTitle>
                <CardDescription>
                  This score is calculated based on the variables listed below
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Review Sections */}
            <Accordion type="multiple" className="space-y-4">
              <ReviewSection
                value="tone-style"
                title="Tone & Style"
                score={feedback?.toneAndStyle?.score || 0}
                tips={feedback?.toneAndStyle?.tips || []}
              />

              <ReviewSection
                value="content"
                title="Content"
                score={feedback?.content?.score || 0}
                tips={feedback?.content?.tips || []}
              />

              <ReviewSection
                value="structure"
                title="Structure"
                score={feedback?.structure?.score || 0}
                tips={feedback?.structure?.tips || []}
              />

              <ReviewSection
                value="skills"
                title="Skills"
                score={feedback?.skills?.score || 0}
                tips={feedback?.skills?.tips || []}
              />
            </Accordion>

            {/* ATS Analysis */}
            <ATSCard
              atsScore={feedback?.ATS?.score || 0}
              keywordRelevance={feedback?.ATS?.keywordRelevance || ""}
              skillsDetected={feedback?.ATS?.skillsDetected || ""}
              noSkillsDetected={feedback?.ATS?.noSkillsDetected || ""}
              improvements={feedback?.improvements || []}
            />
          </motion.div>
        </div>

        {/* Desktop: Resume Image (Fixed) / Mobile: Resume Image (Below) */}
        <div className="lg:order-1">
          <div className="lg:sticky lg:top-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Resume
                companyName={companyName}
                jobTitle={jobTitle}
                resumeUrl={resumeUrl}
                imageUrl={imageUrl}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

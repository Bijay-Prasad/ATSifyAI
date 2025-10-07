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
    jobTitle: "Product Manager",
    imagePath: "/resume-1.png",
    resumePath: "/Rohit_Mehra_Product_Manager_Resume.pdf",
    feedback: {
      overallScore: 91,
      ATS: {
        score: 92,
        tips: [
          {
            type: "good",
            tip: "Excellent keyword alignment with Product Manager roles",
          },
          {
            type: "good",
            tip: "Proper use of ATS-readable formatting (no graphics, consistent sections)",
          },
          {
            type: "warning",
            tip: "Consider adding more quantified metrics for earlier experience",
          },
          {
            type: "good",
            tip: "Uses action verbs and product-impact metrics effectively",
          },
        ],
        keywordRelevance:
          "product strategy, agile, roadmap, data analytics, UX/UI, stakeholder management, user research, SaaS, KPI, SQL, A/B testing",
        skillsDetected:
          "Agile, Scrum, Product Strategy, Data Analytics, Roadmap Planning, UX/UI, SQL, Stakeholder Communication, Jira, Figma",
        noSkillsDetected:
          "Machine Learning, AI Product Design, API Integration, Growth Experimentation",
      },
      improvements: [
        "Add a dedicated Projects section with measurable outcomes",
        "Include more global product exposure or cross-market data points",
        "Highlight user impact or retention metrics in each experience",
        "Add product frameworks used (e.g., RICE, Kano, or MVP testing)",
        "Refine summary to mention leadership philosophy or product vision",
        "Integrate keywords like GTM strategy and customer journey mapping",
        "Add a small technical tools section for better ATS scanning",
      ],
      toneAndStyle: {
        score: 90,
        tips: [
          {
            type: "good",
            tip: "Professional and confident tone",
            explanation:
              "The summary and experience sections use assertive language that conveys leadership and strategic thinking.",
          },
          {
            type: "good",
            tip: "Strong narrative flow",
            explanation:
              "The resume maintains a logical sequence from summary to achievements, keeping the reader engaged.",
          },
          {
            type: "warning",
            tip: "Slightly formal tone",
            explanation:
              "A slightly more conversational tone could make it sound more approachable for modern PM roles at Google.",
          },
          {
            type: "good",
            tip: "Quantified impact highlighted",
            explanation:
              "Metrics like ‘500K+ users’ and ‘23% churn reduction’ effectively demonstrate measurable success.",
          },
        ],
      },
      content: {
        score: 89,
        tips: [
          {
            type: "good",
            tip: "Comprehensive experience coverage",
            explanation:
              "Covers key PM responsibilities from research to execution with measurable outcomes.",
          },
          {
            type: "good",
            tip: "Strong education and certification alignment",
            explanation:
              "ISB and Google Product Management certification strengthen credibility.",
          },
          {
            type: "warning",
            tip: "Limited global product scope",
            explanation:
              "Could include details about international product launches or global user bases.",
          },
          {
            type: "good",
            tip: "Achievements reinforce leadership impact",
            explanation:
              "The achievements section solidifies managerial capability and innovation mindset.",
          },
        ],
      },
      structure: {
        score: 93,
        tips: [
          {
            type: "good",
            tip: "Excellent readability and hierarchy",
            explanation:
              "Consistent section headers, spacing, and clear bullet formatting aid readability.",
          },
          {
            type: "good",
            tip: "ATS-friendly formatting",
            explanation:
              "No use of tables or graphics that would hinder parsing.",
          },
          {
            type: "good",
            tip: "Balanced section layout",
            explanation:
              "Proper division between experience, skills, and education provides strong visual balance.",
          },
          {
            type: "warning",
            tip: "Could add section headers in all caps or bold for more scanning efficiency",
            explanation:
              "This can slightly improve recruiter readability during fast reviews.",
          },
        ],
      },
      skills: {
        score: 88,
        tips: [
          {
            type: "good",
            tip: "Well-rounded PM skill set",
            explanation:
              "Includes mix of analytical, strategic, and collaboration skills crucial for Google PMs.",
          },
          {
            type: "good",
            tip: "Tools and methodologies clearly mentioned",
            explanation:
              "Agile, Jira, and Figma are directly relevant to product workflows.",
          },
          {
            type: "warning",
            tip: "Could expand technical familiarity",
            explanation:
              "Adding familiarity with APIs, ML, or data pipelines would show better technical depth.",
          },
          {
            type: "good",
            tip: "Strong alignment with Google PM expectations",
            explanation:
              "Focus on data-driven decision-making, UX, and cross-functional leadership is spot-on.",
          },
        ],
      },
    },
  },
  {
    id: "2",
    companyName: "Microsoft",
    jobTitle: "Software Engineer",
    imagePath: "/resume-2.png",
    resumePath: "/Nisha_Sharma_Software_Engineer_Resume.pdf",
    feedback: {
      overallScore: 67,
      ATS: {
        score: 66,
        tips: [
          {
            type: "good",
            tip: "Basic ATS-friendly structure",
          },
          {
            type: "warning",
            tip: "Missing Microsoft-specific keywords (C#, .NET, Azure, Visual Studio)",
          },
          {
            type: "warning",
            tip: "Few quantifiable metrics and no Projects section for parsable results",
          },
          {
            type: "good",
            tip: "Plain text, no images or complex tables — parses reliably",
          },
        ],
        keywordRelevance:
          "React, Node.js, REST APIs, JavaScript, MongoDB, AWS, SQL, Jest, Agile",
        skillsDetected:
          "JavaScript, React, Node.js, REST APIs, MongoDB, Jest, Git, AWS (basic), SQL",
        noSkillsDetected:
          "C#, .NET, Azure, Visual Studio, System Design, Multithreading",
      },
      improvements: [
        "Add a Projects section with 2–3 detailed, quantified projects",
        "Include Microsoft-relevant keywords (C#, .NET, Azure) if applicable",
        "Add measurable outcomes (%, numbers) for each experience bullet",
        "List technical environment and tools per role (IDE, CI/CD tools)",
        "Expand skills to include system design, data structures, and algorithms",
        "Improve formatting consistency (uniform dates, bullet punctuation)",
        "Add links to GitHub / portfolio for code samples",
      ],
      toneAndStyle: {
        score: 68,
        tips: [
          {
            type: "good",

            tip: "Professional summary present",

            explanation:
              "The summary concisely states experience and intent, which reads professionally.",
          },

          {
            type: "warning",

            tip: "Generic wording",

            explanation:
              "Phrases like 'looking to contribute' and 'skilled in' are generic — replace with specific value statements and leadership/impact language.",
          },

          {
            type: "warning",

            tip: "Inconsistent level of detail",

            explanation:
              "Some bullets are metric-backed while others are vague; maintain a consistent impact-first tone across bullets.",
          },
        ],
      },
      content: {
        score: 66,
        tips: [
          {
            type: "good",
            tip: "Solid core technical stack listed",
            explanation:
              "React, Node.js, REST APIs, and MongoDB are clearly listed and relevant to many SWE roles.",
          },
          {
            type: "warning",
            tip: "Lack of system-level skills",
            explanation:
              "Resume lacks explicit system design, data structures/algorithms, concurrency, and scaling experience — important for Microsoft SWE roles.",
          },
          {
            type: "warning",
            tip: "Sparse measurable achievements",
            explanation:
              "Only a few metrics (e.g., 'optimized load time by 20%') are present. Each role should have 2–3 quantified achievements.",
          },
          {
            type: "bad",
            tip: "Missing projects and contributions links",
            explanation:
              "No GitHub or portfolio links are provided; without sample code it's harder for technical recruiters to assess engineering depth.",
          },
        ],
      },
      structure: {
        score: 70,
        tips: [
          {
            type: "good",
            tip: "Readable layout",
            explanation:
              "Sections flow logically (Summary → Skills → Experience → Education → Certifications), making it easy to scan.",
          },
          {
            type: "warning",
            tip: "Minor formatting inconsistencies",
            explanation:
              "Date formatting and bullet punctuation are not fully consistent which can reduce perceived polish.",
          },
          {
            type: "warning",
            tip: "No Projects or Technical Highlights section",
            explanation:
              "Adding these sections would improve scan-ability for hiring managers and ATS relevance.",
          },
        ],
      },
      skills: {
        score: 64,
        tips: [
          {
            type: "good",
            tip: "Frontend and full-stack skills present",
            explanation:
              "React, Node.js, REST APIs, and MongoDB demonstrate solid full-stack capability for web roles.",
          },
          {
            type: "warning",
            tip: "Missing backend/OS/compiled-language skills",
            explanation:
              "For Microsoft SWE roles, familiarity with C#, .NET, Windows ecosystem, and low-level concepts is often expected; these are absent.",
          },
          {
            type: "bad",
            tip: "Superficial cloud skills",
            explanation:
              "AWS is listed as 'basic'; since Microsoft uses Azure heavily, lack of Azure or deeper cloud/CI-CD experience weakens the match.",
          },
          {
            type: "warning",
            tip: "No algorithm or interview-prep signals",
            explanation:
              "No mention of competitive programming, algorithmic problem solving, or interview prep (LeetCode, DS&A), which are signals recruiters use for SWE candidates.",
          },
        ],
      },
    },
  },
  {
    id: "3",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    imagePath: "/resume-3.png",
    resumePath: "/Raj_Saxena_iOS_Developer_Resume.pdf",
    feedback: {
      overallScore: 47,
      ATS: {
        score: 45,
        tips: [
          {
            type: "bad",
            tip: "Poor formatting and structure make it difficult for ATS parsing",
          },
          {
            type: "bad",
            tip: "No clear section headers or consistent layout",
          },
          {
            type: "warning",
            tip: "Few Apple-relevant keywords like SwiftUI, Core Data, or Objective-C",
          },
          {
            type: "bad",
            tip: "Contains spelling and grammar errors which can lower ATS readability",
          },
        ],
        keywordRelevance: "Swift, Xcode, Firebase, API, JSON",
        skillsDetected: "Swift, Xcode, Firebase, JSON, API",
        noSkillsDetected:
          "SwiftUI, Core Data, Objective-C, MVVM, Unit Testing, RESTful APIs, Combine, GitHub Actions",
        improvements: [
          "Fix grammar and spelling errors throughout the resume",
          "Add proper formatting with clear headers and bullet points",
          "Include measurable achievements and project outcomes",
          "Add keywords relevant to Apple’s ecosystem (SwiftUI, Core Data, MVVM)",
          "Add a professional summary with clear career goals",
          "Include GitHub/App Store links for projects",
          "Remove casual tone and use action verbs",
        ],
      },
      toneAndStyle: {
        score: 44,
        tips: [
          {
            type: "bad",
            tip: "Unprofessional tone",
            explanation:
              "The resume uses informal language like 'i want to work in apple' which sounds unpolished for a tech company.",
          },
          {
            type: "bad",
            tip: "Inconsistent capitalization",
            explanation:
              "Words like 'ios', 'swift', and 'xcode' are inconsistently capitalized, reducing professionalism.",
          },
          {
            type: "warning",
            tip: "Lack of confident phrasing",
            explanation:
              "Sentences like 'but sometimes project not completed' sound apologetic and self-critical. Focus on achievements instead.",
          },
        ],
      },
      content: {
        score: 46,
        tips: [
          {
            type: "warning",
            tip: "Missing measurable outcomes",
            explanation:
              "No metrics like performance improvements, downloads, or efficiency gains are provided.",
          },
          {
            type: "bad",
            tip: "Incomplete project details",
            explanation:
              "Projects are listed with vague descriptions and no technologies, roles, or results explained clearly.",
          },
          {
            type: "warning",
            tip: "Lacks education and certification depth",
            explanation:
              "Education section lacks GPA, relevant coursework, or completion details.",
          },
          {
            type: "good",
            tip: "Some relevant keywords present",
            explanation:
              "Mentions of Swift, Xcode, and Firebase provide a minimal technical signal for iOS development.",
          },
        ],
      },
      structure: {
        score: 43,
        tips: [
          {
            type: "bad",
            tip: "No visual hierarchy",
            explanation:
              "All text appears in a single font and style, making it hard to distinguish sections.",
          },
          {
            type: "bad",
            tip: "Improper section separation",
            explanation:
              "No clear use of bold headings or consistent spacing; ATS may fail to recognize section boundaries.",
          },
          {
            type: "warning",
            tip: "Overly short and unbalanced content",
            explanation:
              "Lacks sufficient details for each section, leading to poor readability and context.",
          },
        ],
      },
      skills: {
        score: 48,
        tips: [
          {
            type: "good",
            tip: "Mentions core iOS development skills",
            explanation:
              "Lists Swift, Xcode, Firebase, and JSON — all relevant to basic app development.",
          },
          {
            type: "bad",
            tip: "Missing advanced or Apple-specific frameworks",
            explanation:
              "No mention of SwiftUI, Core Data, Combine, or UIKit patterns — crucial for Apple development roles.",
          },
          {
            type: "warning",
            tip: "No testing or CI/CD knowledge",
            explanation:
              "Absence of unit testing, GitHub Actions, or TestFlight deployment experience reduces credibility for production-level roles.",
          },
          {
            type: "bad",
            tip: "Unstructured skill listing",
            explanation:
              "All skills are listed in one line with inconsistent capitalization, making them hard to scan.",
          },
        ],
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

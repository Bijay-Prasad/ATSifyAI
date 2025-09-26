"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

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
}

export default function ReviewPage() {
  const params = useParams()
  const resumeId = params.id as string

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
      case "bad":
        return <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      default:
        return null
    }
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
          <span>DevOps Engineer</span>
          <span>•</span>
          <span>Resume Review</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Mobile: Review Data First */}
        <div className="lg:order-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-2xl font-semibold mb-2">Resume Review</h1>

            {/* Overall Score Card */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Your Resume Score
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {mockReviewData.overallScore}/100
                  </Badge>
                </CardTitle>
                <CardDescription>This score is calculated based on the variables listed below</CardDescription>
              </CardHeader>
            </Card>

            {/* Review Sections */}
            <Accordion type="multiple" className="space-y-4">
              <AccordionItem value="tone-style" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full mr-4">
                    <span className="font-medium">Tone & Style</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{mockReviewData.sections.toneStyle.status}</span>
                      <Badge variant="secondary">{mockReviewData.sections.toneStyle.score}/100</Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="space-y-3">
                    {mockReviewData.sections.toneStyle.items.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        {getStatusIcon(item.status)}
                        <span className="text-sm">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="content" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full mr-4">
                    <span className="font-medium">Content</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{mockReviewData.sections.content.status}</span>
                      <Badge variant="destructive">{mockReviewData.sections.content.score}/100</Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="space-y-3">
                    {mockReviewData.sections.content.items.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        {getStatusIcon(item.status)}
                        <span className="text-sm">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="structure" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full mr-4">
                    <span className="font-medium">Structure</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{mockReviewData.sections.structure.status}</span>
                      <Badge variant="outline">{mockReviewData.sections.structure.score}/100</Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="space-y-3">
                    {mockReviewData.sections.structure.items.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        {getStatusIcon(item.status)}
                        <span className="text-sm">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="skills" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full mr-4">
                    <span className="font-medium">Skills</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{mockReviewData.sections.skills.status}</span>
                      <Badge variant="destructive">{mockReviewData.sections.skills.score}/100</Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="space-y-3">
                    {mockReviewData.sections.skills.items.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        {getStatusIcon(item.status)}
                        <span className="text-sm">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="resume-improvement" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <span className="font-medium">Resume Improvement Checklist</span>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="space-y-3">
                    {mockReviewData.improvements.map((improvement, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5" />
                        <span className="text-sm">{improvement}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* ATS Analysis */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ATS Score • {mockReviewData.atsScore}/100
                </CardTitle>
                <CardDescription>How well does your resume pass through Applicant Tracking Systems?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">
                      Your resume was scanned like an employer would. Here's how it performed:
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5" />
                        <span className="text-sm">{mockReviewData.atsAnalysis.keywordRelevance}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5" />
                        <span className="text-sm">{mockReviewData.atsAnalysis.skillsDetected}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <XCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5" />
                        <span className="text-sm">{mockReviewData.atsAnalysis.noSkillsDetected}</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Want a better score? Improve your resume by applying the suggestions listed below
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
              <Card className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{mockReviewData.name}</CardTitle>
                      <CardDescription>{mockReviewData.title}</CardDescription>
                    </div>
                    <Badge variant="secondary">Resume Preview</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Resume Preview - Using placeholder for now */}
                  <div className="bg-white dark:bg-gray-900 border rounded-lg mx-6 mb-6 p-6 min-h-[600px] shadow-sm">
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="text-center border-b pb-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{mockReviewData.name}</h2>
                        <p className="text-gray-600 dark:text-gray-400">{mockReviewData.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">email@example.com • (555) 123-4567</p>
                      </div>

                      {/* Experience */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Experience</h3>
                        <div className="space-y-4">
                          {mockReviewData.experience.map((exp, index) => (
                            <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                              <div className="flex justify-between items-start mb-1">
                                <h4 className="font-medium text-gray-900 dark:text-gray-100">{exp.role}</h4>
                                <span className="text-sm text-gray-500 dark:text-gray-500">{exp.period}</span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{exp.company}</p>
                              <p className="text-sm text-gray-700 dark:text-gray-300">{exp.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Skills */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {["React", "TypeScript", "Node.js", "AWS", "Docker"].map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

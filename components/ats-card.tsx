"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { ImprovementsList } from "@/components/improvements-list";

interface ATSCardProps {
  atsScore: number;
  keywordRelevance: string;
  skillsDetected: string;
  noSkillsDetected: string;
  improvements: string[];
}

const color = (score: number) =>
  score > 69
    ? "text-green-600 dark:text-green-400"
    : score > 49
    ? "text-amber-600 dark:text-amber-400"
    : "text-red-600 dark:text-red-400";

const getStatusIcon = (score: number) =>
  score > 69 ? (
    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
  ) : score > 49 ? (
    <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
  ) : (
    <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
  );

export function ATSCard({
  atsScore,
  keywordRelevance,
  skillsDetected,
  noSkillsDetected,
  improvements,
}: ATSCardProps) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon(atsScore)}
          ATS Score • <span className={color(atsScore)}>{atsScore}/100</span>
        </CardTitle>
        <CardDescription>
          How well does your resume pass through Applicant Tracking Systems?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-2">
              Your resume was scanned like an employer would. Here's how it
              performed:
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5" />
                <span className="text-sm">
                  <span className="font-bold">Required Skills:</span>{" "}
                  {keywordRelevance}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5" />
                <span className="text-sm">
                  <span className="font-bold items-center">Found Skills:</span>{" "}
                  {skillsDetected}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5" />
                <span className="text-sm">
                  <span className="font-bold">Missing Skills:</span>{" "}
                  {noSkillsDetected}
                </span>
              </div>
            </div>
          </div>
          <ImprovementsList improvements={improvements} />
        </div>
      </CardContent>
    </Card>
  );
}

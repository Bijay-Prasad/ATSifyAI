"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";

interface ResumeProps {
  companyName: string;
  jobTitle: string;
  imageUrl: string;
  resumeUrl: string;
}

export function Resume({
  companyName,
  jobTitle,
  imageUrl,
  resumeUrl,
}: ResumeProps){
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg capitalize">{companyName}</CardTitle>
            <CardDescription className="capitalize">{jobTitle}</CardDescription>
          </div>
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
            <Badge variant="secondary">Resume Preview</Badge>
          </a>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* Resume Preview - Using placeholder for now */}
        <div className="bg-white dark:bg-gray-900 border rounded-lg mx-6 mb-6 p-6 shadow-sm">
          <div className="space-y-6">
            {imageUrl && resumeUrl && (
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  alt="dummy resume"
                  className="w-full h-full object-cover"
                />
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

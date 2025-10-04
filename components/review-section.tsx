"use client";

import { Badge } from "@/components/ui/badge";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface Tip {
  type: "good" | "warning" | "bad";
  tip: string;
  explanation: string;
}

interface ReviewSectionProps {
  value: string;
  title: string;
  score: number;
  tips: Tip[];
}

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

const subtitle = (score: number) =>
  score > 69 ? "Great Job!" : score > 49 ? "Good Start" : "Needs Improvement";

const color = (score: number) =>
  score > 69
    ? "text-green-600 dark:text-green-400"
    : score > 49
    ? "text-amber-600 dark:text-amber-400"
    : "text-red-600 dark:text-red-400";

export function ReviewSection({ value, title, score, tips }: ReviewSectionProps) {
  return (
    <AccordionItem value={value} className="border rounded-lg px-4">
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center justify-between w-full mr-4">
          <span className="font-medium">{title}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {subtitle(score)}
            </span>
            <Badge variant="secondary" className={color(score)}>
              {score}/100
            </Badge>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-4">
        <div className="space-y-4">
          {/* Tips in 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tips?.map((tip, index) => (
              <div key={index} className="flex items-start gap-3">
                {getStatusIcon(tip.type)}
                <span className="text-sm">{tip.tip}</span>
              </div>
            ))}
          </div>

          {/* Tips with explanations */}
          <div className="space-y-3 pt-4 border-t">
            {tips?.map((tip, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-start gap-3">
                  {getStatusIcon(tip.type)}
                  <span className="text-sm font-medium">{tip.tip}</span>
                </div>
                <div className="ml-7">
                  <span className="text-sm text-muted-foreground">
                    {tip.explanation}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface ImprovementsListProps {
  improvements: string[];
}

export function ImprovementsList({ improvements }: ImprovementsListProps) {
  return (
    <div className="pt-4 border-t">
      <p className="text-sm text-muted-foreground">
        Want a better score? Improve your resume by applying the suggestions
        listed below
      </p>
      <h3 className="font-medium text-md mb-4">
        Resume Improvement Checklist:
      </h3>
      <div className="space-y-3">
        {improvements?.map((improvement, index) => (
          <div key={index} className="flex items-start gap-3">
            <Checkbox className="mt-0.5" />
            <span className="text-sm">{improvement}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

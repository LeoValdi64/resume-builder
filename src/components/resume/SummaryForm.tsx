"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";

interface SummaryFormProps {
  data: string;
  onChange: (data: string) => void;
}

export function SummaryForm({ data, onChange }: SummaryFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="summary" className="flex items-center gap-2">
          <FileText className="size-4 text-muted-foreground" />
          Professional Summary
        </Label>
        <p className="text-sm text-muted-foreground">
          Write a brief summary highlighting your professional background,
          key skills, and career objectives. Keep it concise and impactful.
        </p>
        <Textarea
          id="summary"
          placeholder="Experienced software engineer with 5+ years of expertise in building scalable web applications. Passionate about clean code, user experience, and mentoring junior developers. Seeking to leverage my skills in a challenging role at an innovative company..."
          value={data}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[200px] resize-y"
        />
        <p className="text-xs text-muted-foreground text-right">
          {data.length} characters
        </p>
      </div>
    </div>
  );
}

"use client";

import { ResumeData, TemplateStyle } from "@/types/resume";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { forwardRef } from "react";

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateStyle;
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  function ResumePreview({ data, template }, ref) {
    const renderTemplate = () => {
      switch (template) {
        case "classic":
          return <ClassicTemplate data={data} />;
        case "modern":
          return <ModernTemplate data={data} />;
        case "minimal":
          return <MinimalTemplate data={data} />;
        default:
          return <ClassicTemplate data={data} />;
      }
    };

    return (
      <div
        ref={ref}
        className="resume-preview w-full bg-white p-6 shadow-lg"
        style={{
          aspectRatio: "8.5 / 11",
          maxWidth: "8.5in",
          minHeight: "11in",
        }}
      >
        {renderTemplate()}
      </div>
    );
  }
);

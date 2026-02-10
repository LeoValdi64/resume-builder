"use client";

import { ResumeData } from "@/types/resume";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
} from "lucide-react";

interface ClassicTemplateProps {
  data: ResumeData;
}

function formatDate(dateString: string): string {
  if (!dateString) return "";
  const [year, month] = dateString.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function ClassicTemplate({ data }: ClassicTemplateProps) {
  const { personalInfo, summary, experience, education, skillCategories, certifications } = data;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim();

  return (
    <div className="w-full bg-white text-black font-serif">
      {/* Header */}
      <header className="border-b-2 border-black pb-4 mb-6">
        <h1 className="text-3xl font-bold text-center tracking-wide uppercase">
          {fullName || "Your Name"}
        </h1>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 text-sm">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="size-3" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="size-3" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="size-3" />
              {personalInfo.location}
            </span>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-1 text-sm">
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="size-3" />
              {personalInfo.website}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="size-3" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1">
              <Github className="size-3" />
              {personalInfo.github}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-black mb-2">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-justify">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-black mb-3">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{exp.position}</h3>
                    <p className="italic">{exp.company}{exp.location && `, ${exp.location}`}</p>
                  </div>
                  <p className="text-sm whitespace-nowrap">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </p>
                </div>
                {exp.description && (
                  <p className="text-sm mt-1">{exp.description}</p>
                )}
                {exp.highlights.length > 0 && (
                  <ul className="list-disc list-inside text-sm mt-1 space-y-0.5">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-black mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">
                      {edu.degree}{edu.field && ` in ${edu.field}`}
                    </h3>
                    <p className="italic">{edu.institution}{edu.location && `, ${edu.location}`}</p>
                  </div>
                  <div className="text-sm text-right whitespace-nowrap">
                    <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                    {edu.gpa && <p>GPA: {edu.gpa}</p>}
                  </div>
                </div>
                {edu.highlights.length > 0 && (
                  <ul className="list-disc list-inside text-sm mt-1 space-y-0.5">
                    {edu.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skillCategories.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-black mb-3">
            Skills
          </h2>
          <div className="space-y-2">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="text-sm">
                <span className="font-bold">{cat.name}: </span>
                <span>{cat.skills.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-black mb-3">
            Certifications
          </h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-start text-sm">
                <div>
                  <span className="font-bold">{cert.name}</span>
                  {cert.issuer && <span className="italic"> - {cert.issuer}</span>}
                  {cert.credentialId && (
                    <span className="text-gray-600"> (ID: {cert.credentialId})</span>
                  )}
                </div>
                <span className="whitespace-nowrap">
                  {formatDate(cert.date)}
                  {cert.expirationDate && ` - ${formatDate(cert.expirationDate)}`}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

"use client";

import { ResumeData } from "@/types/resume";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Briefcase,
  GraduationCap,
  Award,
  Code,
} from "lucide-react";

interface ModernTemplateProps {
  data: ResumeData;
}

function formatDate(dateString: string): string {
  if (!dateString) return "";
  const [year, month] = dateString.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  const { personalInfo, summary, experience, education, skillCategories, certifications } = data;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim();

  return (
    <div className="w-full bg-white text-black font-sans">
      {/* Header with accent color */}
      <header className="bg-slate-800 text-white px-6 py-6 -mx-6 -mt-6 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          {fullName || "Your Name"}
        </h1>

        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-sm text-slate-200">
          {personalInfo.email && (
            <span className="flex items-center gap-2">
              <Mail className="size-4" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-2">
              <Phone className="size-4" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-2">
              <MapPin className="size-4" />
              {personalInfo.location}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-2 text-sm text-slate-200">
          {personalInfo.website && (
            <span className="flex items-center gap-2">
              <Globe className="size-4" />
              {personalInfo.website}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-2">
              <Linkedin className="size-4" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-2">
              <Github className="size-4" />
              {personalInfo.github}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <p className="text-sm leading-relaxed text-gray-700 bg-slate-50 p-4 rounded-lg border-l-4 border-slate-800">
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-4">
            <Briefcase className="size-5" />
            Experience
          </h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200">
                <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-slate-800" />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                  <div>
                    <h3 className="font-bold text-slate-900">{exp.position}</h3>
                    <p className="text-slate-600 font-medium">
                      {exp.company}
                      {exp.location && <span className="text-slate-400"> | {exp.location}</span>}
                    </p>
                  </div>
                  <p className="text-sm text-slate-500 whitespace-nowrap font-medium">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </p>
                </div>
                {exp.description && (
                  <p className="text-sm text-slate-600 mt-2">{exp.description}</p>
                )}
                {exp.highlights.length > 0 && (
                  <ul className="text-sm text-slate-600 mt-2 space-y-1">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1.5">-</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Two column layout for Education and Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-4">
              <GraduationCap className="size-5" />
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="bg-slate-50 p-3 rounded-lg">
                  <h3 className="font-bold text-slate-900">
                    {edu.degree}{edu.field && ` in ${edu.field}`}
                  </h3>
                  <p className="text-sm text-slate-600">{edu.institution}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    {edu.gpa && <span className="ml-2">| GPA: {edu.gpa}</span>}
                  </p>
                  {edu.highlights.length > 0 && (
                    <ul className="text-xs text-slate-600 mt-2 space-y-0.5">
                      {edu.highlights.map((highlight, idx) => (
                        <li key={idx}>- {highlight}</li>
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
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-4">
              <Code className="size-5" />
              Skills
            </h2>
            <div className="space-y-3">
              {skillCategories.map((cat) => (
                <div key={cat.id}>
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">{cat.name}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-xs bg-slate-100 text-slate-700 rounded-full border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-4">
            <Award className="size-5" />
            Certifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg">
                <Award className="size-5 text-slate-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-medium text-sm text-slate-900">{cert.name}</h3>
                  <p className="text-xs text-slate-600">{cert.issuer}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {formatDate(cert.date)}
                    {cert.expirationDate && ` - ${formatDate(cert.expirationDate)}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

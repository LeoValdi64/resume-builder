"use client";

import { ResumeData } from "@/types/resume";

interface MinimalTemplateProps {
  data: ResumeData;
}

function formatDate(dateString: string): string {
  if (!dateString) return "";
  const [year, month] = dateString.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
  const { personalInfo, summary, experience, education, skillCategories, certifications } = data;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim();

  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.website,
    personalInfo.linkedin,
    personalInfo.github,
  ].filter(Boolean);

  return (
    <div className="w-full bg-white text-black font-sans text-[13px] leading-relaxed">
      {/* Header - Clean and minimal */}
      <header className="mb-8">
        <h1 className="text-2xl font-light tracking-wide mb-3">
          {fullName || "Your Name"}
        </h1>
        {contactItems.length > 0 && (
          <p className="text-gray-500 text-xs">
            {contactItems.join("  /  ")}
          </p>
        )}
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-8">
          <p className="text-gray-600 leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-4">
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium">{exp.position}</h3>
                  <span className="text-xs text-gray-400">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-gray-500 mb-2">
                  {exp.company}
                  {exp.location && `, ${exp.location}`}
                </p>
                {exp.description && (
                  <p className="text-gray-600 mb-2">{exp.description}</p>
                )}
                {exp.highlights.length > 0 && (
                  <ul className="text-gray-600 space-y-1">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="pl-3 relative before:content-['-'] before:absolute before:left-0 before:text-gray-300">
                        {highlight}
                      </li>
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
        <section className="mb-8">
          <h2 className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-4">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium">
                    {edu.degree}{edu.field && `, ${edu.field}`}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {formatDate(edu.endDate)}
                  </span>
                </div>
                <p className="text-gray-500">
                  {edu.institution}
                  {edu.gpa && <span className="text-gray-400"> | {edu.gpa}</span>}
                </p>
                {edu.highlights.length > 0 && (
                  <ul className="text-gray-600 mt-1 space-y-0.5">
                    {edu.highlights.map((highlight, idx) => (
                      <li key={idx} className="pl-3 relative before:content-['-'] before:absolute before:left-0 before:text-gray-300">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills - Inline format */}
      {skillCategories.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-4">
            Skills
          </h2>
          <div className="space-y-2">
            {skillCategories.map((cat) => (
              <p key={cat.id} className="text-gray-600">
                <span className="font-medium text-gray-800">{cat.name}:</span>{" "}
                {cat.skills.join(", ")}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-4">
            Certifications
          </h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">{cert.name}</span>
                  {cert.issuer && <span className="text-gray-400"> / {cert.issuer}</span>}
                </p>
                <span className="text-xs text-gray-400">{formatDate(cert.date)}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

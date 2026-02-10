"use client";

import { ResumeData, FormStep, FORM_STEPS } from "@/types/resume";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { SummaryForm } from "./SummaryForm";
import { ExperienceForm } from "./ExperienceForm";
import { EducationForm } from "./EducationForm";
import { SkillsForm } from "./SkillsForm";
import { CertificationsForm } from "./CertificationsForm";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FormWizardProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  currentStep: FormStep;
  onStepChange: (step: FormStep) => void;
}

export function FormWizard({
  data,
  onChange,
  currentStep,
  onStepChange,
}: FormWizardProps) {
  const currentStepIndex = FORM_STEPS.findIndex((s) => s.key === currentStep);
  const progress = ((currentStepIndex + 1) / FORM_STEPS.length) * 100;

  const goToNextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < FORM_STEPS.length) {
      onStepChange(FORM_STEPS[nextIndex].key);
    }
  };

  const goToPreviousStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      onStepChange(FORM_STEPS[prevIndex].key);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "personal":
        return (
          <PersonalInfoForm
            data={data.personalInfo}
            onChange={(personalInfo) => onChange({ ...data, personalInfo })}
          />
        );
      case "summary":
        return (
          <SummaryForm
            data={data.summary}
            onChange={(summary) => onChange({ ...data, summary })}
          />
        );
      case "experience":
        return (
          <ExperienceForm
            data={data.experience}
            onChange={(experience) => onChange({ ...data, experience })}
          />
        );
      case "education":
        return (
          <EducationForm
            data={data.education}
            onChange={(education) => onChange({ ...data, education })}
          />
        );
      case "skills":
        return (
          <SkillsForm
            data={data.skillCategories}
            onChange={(skillCategories) => onChange({ ...data, skillCategories })}
          />
        );
      case "certifications":
        return (
          <CertificationsForm
            data={data.certifications}
            onChange={(certifications) => onChange({ ...data, certifications })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Step indicators */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          {FORM_STEPS.map((step, index) => (
            <button
              key={step.key}
              onClick={() => onStepChange(step.key)}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all",
                index < currentStepIndex
                  ? "bg-primary text-primary-foreground"
                  : index === currentStepIndex
                  ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {index < currentStepIndex ? (
                <Check className="size-4" />
              ) : (
                index + 1
              )}
            </button>
          ))}
        </div>
        <Progress value={progress} className="h-1" />
        <div className="flex justify-between mt-2">
          {FORM_STEPS.map((step, index) => (
            <span
              key={step.key}
              className={cn(
                "text-xs transition-colors",
                index === currentStepIndex
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl font-semibold mb-4">
              {FORM_STEPS[currentStepIndex].label}
            </h2>
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between pt-6 mt-6 border-t">
        <Button
          variant="outline"
          onClick={goToPreviousStep}
          disabled={currentStepIndex === 0}
          className="gap-2"
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>
        <Button
          onClick={goToNextStep}
          disabled={currentStepIndex === FORM_STEPS.length - 1}
          className="gap-2"
        >
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

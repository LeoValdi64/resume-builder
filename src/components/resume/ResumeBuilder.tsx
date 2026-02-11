"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  ResumeData,
  TemplateStyle,
  FormStep,
  createEmptyResume,
} from "@/types/resume";
import { Header } from "./Header";
import { FormWizard } from "./FormWizard";
import { ResumePreview } from "./ResumePreview";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { FileEdit, Eye } from "lucide-react";

const STORAGE_KEY = "resumeforge_data";
const TEMPLATE_KEY = "resumeforge_template";

export function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(createEmptyResume());
  const [template, setTemplate] = useState<TemplateStyle>("modern");
  const [currentStep, setCurrentStep] = useState<FormStep>("personal");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const previewRef = useRef<HTMLDivElement>(null);

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const savedTemplate = localStorage.getItem(TEMPLATE_KEY);

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData) as ResumeData;
        setResumeData(parsed);
      } catch (e) {
        console.error("Failed to parse saved resume data:", e);
      }
    }

    if (savedTemplate) {
      setTemplate(savedTemplate as TemplateStyle);
    }

    setIsLoaded(true);
  }, []);

  // Auto-save on data change
  useEffect(() => {
    if (!isLoaded) return;

    const timeoutId = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
      localStorage.setItem(TEMPLATE_KEY, template);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [resumeData, template, isLoaded]);

  const handleSave = useCallback(() => {
    setIsSaving(true);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    localStorage.setItem(TEMPLATE_KEY, template);
    setTimeout(() => setIsSaving(false), 500);
  }, [resumeData, template]);

  const handleLoad = useCallback(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const savedTemplate = localStorage.getItem(TEMPLATE_KEY);

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData) as ResumeData;
        setResumeData(parsed);
      } catch (e) {
        console.error("Failed to parse saved resume data:", e);
      }
    }

    if (savedTemplate) {
      setTemplate(savedTemplate as TemplateStyle);
    }
  }, []);

  const handleClear = useCallback(() => {
    if (confirm("Are you sure you want to clear all data? This cannot be undone.")) {
      setResumeData(createEmptyResume());
      setCurrentStep("personal");
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const handleExportPDF = useCallback(() => {
    window.print();
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        template={template}
        onTemplateChange={setTemplate}
        onSave={handleSave}
        onLoad={handleLoad}
        onClear={handleClear}
        onExportPDF={handleExportPDF}
        isSaving={isSaving}
      />

      <main className="container mx-auto px-4 py-6">
        {/* Desktop layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6">
          {/* Form panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-[calc(100vh-140px)] overflow-hidden">
              <div className="h-full p-6 overflow-y-auto">
                <FormWizard
                  data={resumeData}
                  onChange={setResumeData}
                  currentStep={currentStep}
                  onStepChange={setCurrentStep}
                />
              </div>
            </Card>
          </motion.div>

          {/* Preview panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="no-print"
          >
            <div className="h-[calc(100vh-140px)] overflow-auto bg-muted/50 rounded-lg p-4">
              <div className="flex justify-center">
                <div className="transform origin-top scale-[0.6] xl:scale-[0.7]">
                  <ResumePreview
                    ref={previewRef}
                    data={resumeData}
                    template={template}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile/Tablet layout */}
        <div className="lg:hidden">
          <Tabs
            value={mobileTab}
            onValueChange={(v) => setMobileTab(v as "edit" | "preview")}
            className="w-full"
          >
            <TabsList className="w-full mb-4">
              <TabsTrigger value="edit" className="flex-1 gap-2">
                <FileEdit className="size-4" />
                Edit
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex-1 gap-2">
                <Eye className="size-4" />
                Preview
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="edit" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Card className="p-3 sm:p-6">
                    <FormWizard
                      data={resumeData}
                      onChange={setResumeData}
                      currentStep={currentStep}
                      onStepChange={setCurrentStep}
                    />
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="preview" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="no-print overflow-auto bg-muted/50 rounded-lg p-4"
                >
                  <div className="flex justify-center">
                    <div className="transform origin-top scale-[0.5] sm:scale-[0.6]">
                      <ResumePreview
                        ref={previewRef}
                        data={resumeData}
                        template={template}
                      />
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </div>
      </main>

      {/* Print-only preview */}
      <div className="hidden print:block">
        <ResumePreview data={resumeData} template={template} />
      </div>
    </div>
  );
}

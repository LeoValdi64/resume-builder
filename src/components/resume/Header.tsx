"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TemplateStyle } from "@/types/resume";
import {
  FileText,
  Download,
  Save,
  FolderOpen,
  Trash2,
  Layout,
  LayoutTemplate,
  Minus,
} from "lucide-react";
import { motion } from "framer-motion";

interface HeaderProps {
  template: TemplateStyle;
  onTemplateChange: (template: TemplateStyle) => void;
  onSave: () => void;
  onLoad: () => void;
  onClear: () => void;
  onExportPDF: () => void;
  isSaving: boolean;
}

export function Header({
  template,
  onTemplateChange,
  onSave,
  onLoad,
  onClear,
  onExportPDF,
  isSaving,
}: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="no-print sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary">
              <FileText className="size-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">ResumeForge</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Professional Resume Builder
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Template selector */}
            <div className="hidden sm:flex items-center gap-2">
              <Select
                value={template}
                onValueChange={(v) => onTemplateChange(v as TemplateStyle)}
              >
                <SelectTrigger className="w-[140px]">
                  <LayoutTemplate className="size-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classic">
                    <div className="flex items-center gap-2">
                      <Layout className="size-4" />
                      Classic
                    </div>
                  </SelectItem>
                  <SelectItem value="modern">
                    <div className="flex items-center gap-2">
                      <LayoutTemplate className="size-4" />
                      Modern
                    </div>
                  </SelectItem>
                  <SelectItem value="minimal">
                    <div className="flex items-center gap-2">
                      <Minus className="size-4" />
                      Minimal
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Save/Load buttons */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onLoad}
                title="Load saved resume"
              >
                <FolderOpen className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onSave}
                disabled={isSaving}
                title="Save resume"
              >
                <Save className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onClear}
                title="Clear all data"
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>

            {/* Export button */}
            <Button onClick={onExportPDF} className="gap-2">
              <Download className="size-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </Button>
          </div>
        </div>

        {/* Mobile template selector */}
        <div className="sm:hidden mt-3">
          <Select
            value={template}
            onValueChange={(v) => onTemplateChange(v as TemplateStyle)}
          >
            <SelectTrigger className="w-full">
              <LayoutTemplate className="size-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="classic">Classic</SelectItem>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="minimal">Minimal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.header>
  );
}

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WorkExperience, createWorkExperience } from "@/types/resume";
import {
  Building2,
  Briefcase,
  MapPin,
  Calendar,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  GripVertical,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ExperienceFormProps {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
}

export function ExperienceForm({ data, onChange }: ExperienceFormProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(data.map((exp) => exp.id))
  );

  const addExperience = () => {
    const newExp = createWorkExperience();
    onChange([...data, newExp]);
    setExpandedIds(new Set([...expandedIds, newExp.id]));
  };

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id));
    const newExpanded = new Set(expandedIds);
    newExpanded.delete(id);
    setExpandedIds(newExpanded);
  };

  const updateExperience = (
    id: string,
    field: keyof WorkExperience,
    value: string | boolean | string[]
  ) => {
    onChange(
      data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  const handleHighlightsChange = (id: string, value: string) => {
    const highlights = value
      .split("\n")
      .map((h) => h.trim())
      .filter((h) => h.length > 0);
    updateExperience(id, "highlights", highlights);
  };

  const moveExperience = (index: number, direction: "up" | "down") => {
    const newData = [...data];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= data.length) return;
    [newData[index], newData[newIndex]] = [newData[newIndex], newData[index]];
    onChange(newData);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Add your work experience, starting with the most recent position.
        </p>
        <Button onClick={addExperience} size="sm" className="gap-2">
          <Plus className="size-4" />
          Add Experience
        </Button>
      </div>

      <AnimatePresence mode="popLayout">
        {data.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => moveExperience(index, "up")}
                        disabled={index === 0}
                        className="h-4 w-4"
                      >
                        <ChevronUp className="size-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => moveExperience(index, "down")}
                        disabled={index === data.length - 1}
                        className="h-4 w-4"
                      >
                        <ChevronDown className="size-3" />
                      </Button>
                    </div>
                    <GripVertical className="size-4 text-muted-foreground" />
                    <CardTitle
                      className="text-base cursor-pointer flex items-center gap-2"
                      onClick={() => toggleExpand(exp.id)}
                    >
                      {exp.position || exp.company ? (
                        <>
                          <span>{exp.position || "Position"}</span>
                          {exp.company && (
                            <span className="text-muted-foreground font-normal">
                              at {exp.company}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-muted-foreground">
                          New Experience
                        </span>
                      )}
                      {exp.current && (
                        <Badge variant="secondary" className="ml-2">
                          Current
                        </Badge>
                      )}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => toggleExpand(exp.id)}
                    >
                      {expandedIds.has(exp.id) ? (
                        <ChevronUp className="size-4" />
                      ) : (
                        <ChevronDown className="size-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeExperience(exp.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <AnimatePresence>
                {expandedIds.has(exp.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Building2 className="size-4 text-muted-foreground" />
                            Company
                          </Label>
                          <Input
                            placeholder="Company Name"
                            value={exp.company}
                            onChange={(e) =>
                              updateExperience(exp.id, "company", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Briefcase className="size-4 text-muted-foreground" />
                            Position
                          </Label>
                          <Input
                            placeholder="Job Title"
                            value={exp.position}
                            onChange={(e) =>
                              updateExperience(exp.id, "position", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <MapPin className="size-4 text-muted-foreground" />
                          Location
                        </Label>
                        <Input
                          placeholder="City, State or Remote"
                          value={exp.location}
                          onChange={(e) =>
                            updateExperience(exp.id, "location", e.target.value)
                          }
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Calendar className="size-4 text-muted-foreground" />
                            Start Date
                          </Label>
                          <Input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) =>
                              updateExperience(exp.id, "startDate", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Calendar className="size-4 text-muted-foreground" />
                            End Date
                          </Label>
                          <Input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) =>
                              updateExperience(exp.id, "endDate", e.target.value)
                            }
                            disabled={exp.current}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`current-${exp.id}`}
                          checked={exp.current}
                          onChange={(e) =>
                            updateExperience(exp.id, "current", e.target.checked)
                          }
                          className="size-4 rounded border-input"
                        />
                        <Label htmlFor={`current-${exp.id}`}>
                          I currently work here
                        </Label>
                      </div>

                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          placeholder="Brief description of your role and responsibilities..."
                          value={exp.description}
                          onChange={(e) =>
                            updateExperience(exp.id, "description", e.target.value)
                          }
                          className="min-h-[80px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Key Achievements (one per line)</Label>
                        <Textarea
                          placeholder="Increased sales by 25% through implementing new marketing strategies&#10;Led a team of 5 developers to deliver project ahead of schedule&#10;Reduced operational costs by $50K annually"
                          value={exp.highlights.join("\n")}
                          onChange={(e) =>
                            handleHighlightsChange(exp.id, e.target.value)
                          }
                          className="min-h-[120px]"
                        />
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {data.length === 0 && (
        <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg">
          <Briefcase className="size-12 mx-auto mb-4 opacity-50" />
          <p>No work experience added yet.</p>
          <p className="text-sm">Click the button above to add your first position.</p>
        </div>
      )}
    </div>
  );
}

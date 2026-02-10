"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Education, createEducation } from "@/types/resume";
import {
  GraduationCap,
  Building,
  MapPin,
  Calendar,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export function EducationForm({ data, onChange }: EducationFormProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(data.map((edu) => edu.id))
  );

  const addEducation = () => {
    const newEdu = createEducation();
    onChange([...data, newEdu]);
    setExpandedIds(new Set([...expandedIds, newEdu.id]));
  };

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id));
    const newExpanded = new Set(expandedIds);
    newExpanded.delete(id);
    setExpandedIds(newExpanded);
  };

  const updateEducation = (
    id: string,
    field: keyof Education,
    value: string | string[]
  ) => {
    onChange(
      data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
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
    updateEducation(id, "highlights", highlights);
  };

  const moveEducation = (index: number, direction: "up" | "down") => {
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
          Add your educational background, starting with the most recent.
        </p>
        <Button onClick={addEducation} size="sm" className="gap-2">
          <Plus className="size-4" />
          Add Education
        </Button>
      </div>

      <AnimatePresence mode="popLayout">
        {data.map((edu, index) => (
          <motion.div
            key={edu.id}
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
                        onClick={() => moveEducation(index, "up")}
                        disabled={index === 0}
                        className="h-4 w-4"
                      >
                        <ChevronUp className="size-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => moveEducation(index, "down")}
                        disabled={index === data.length - 1}
                        className="h-4 w-4"
                      >
                        <ChevronDown className="size-3" />
                      </Button>
                    </div>
                    <GripVertical className="size-4 text-muted-foreground" />
                    <CardTitle
                      className="text-base cursor-pointer flex items-center gap-2"
                      onClick={() => toggleExpand(edu.id)}
                    >
                      {edu.degree || edu.institution ? (
                        <>
                          <span>{edu.degree || "Degree"}</span>
                          {edu.institution && (
                            <span className="text-muted-foreground font-normal">
                              from {edu.institution}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-muted-foreground">
                          New Education
                        </span>
                      )}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => toggleExpand(edu.id)}
                    >
                      {expandedIds.has(edu.id) ? (
                        <ChevronUp className="size-4" />
                      ) : (
                        <ChevronDown className="size-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeEducation(edu.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <AnimatePresence>
                {expandedIds.has(edu.id) && (
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
                            <Building className="size-4 text-muted-foreground" />
                            Institution
                          </Label>
                          <Input
                            placeholder="University or College Name"
                            value={edu.institution}
                            onChange={(e) =>
                              updateEducation(edu.id, "institution", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <GraduationCap className="size-4 text-muted-foreground" />
                            Degree
                          </Label>
                          <Input
                            placeholder="Bachelor of Science"
                            value={edu.degree}
                            onChange={(e) =>
                              updateEducation(edu.id, "degree", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Award className="size-4 text-muted-foreground" />
                            Field of Study
                          </Label>
                          <Input
                            placeholder="Computer Science"
                            value={edu.field}
                            onChange={(e) =>
                              updateEducation(edu.id, "field", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <MapPin className="size-4 text-muted-foreground" />
                            Location
                          </Label>
                          <Input
                            placeholder="City, State"
                            value={edu.location}
                            onChange={(e) =>
                              updateEducation(edu.id, "location", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Calendar className="size-4 text-muted-foreground" />
                            Start Date
                          </Label>
                          <Input
                            type="month"
                            value={edu.startDate}
                            onChange={(e) =>
                              updateEducation(edu.id, "startDate", e.target.value)
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
                            value={edu.endDate}
                            onChange={(e) =>
                              updateEducation(edu.id, "endDate", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>GPA (Optional)</Label>
                          <Input
                            placeholder="3.8/4.0"
                            value={edu.gpa}
                            onChange={(e) =>
                              updateEducation(edu.id, "gpa", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Achievements & Activities (one per line)</Label>
                        <Textarea
                          placeholder="Dean's List for 4 semesters&#10;President of Computer Science Club&#10;Graduated with Honors"
                          value={edu.highlights.join("\n")}
                          onChange={(e) =>
                            handleHighlightsChange(edu.id, e.target.value)
                          }
                          className="min-h-[100px]"
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
          <GraduationCap className="size-12 mx-auto mb-4 opacity-50" />
          <p>No education added yet.</p>
          <p className="text-sm">Click the button above to add your education.</p>
        </div>
      )}
    </div>
  );
}

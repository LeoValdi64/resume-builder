"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SkillCategory, createSkillCategory } from "@/types/resume";
import {
  Layers,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  GripVertical,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SkillsFormProps {
  data: SkillCategory[];
  onChange: (data: SkillCategory[]) => void;
}

export function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(data.map((cat) => cat.id))
  );
  const [newSkillInputs, setNewSkillInputs] = useState<Record<string, string>>({});

  const addCategory = () => {
    const newCat = createSkillCategory();
    onChange([...data, newCat]);
    setExpandedIds(new Set([...expandedIds, newCat.id]));
  };

  const removeCategory = (id: string) => {
    onChange(data.filter((cat) => cat.id !== id));
    const newExpanded = new Set(expandedIds);
    newExpanded.delete(id);
    setExpandedIds(newExpanded);
  };

  const updateCategory = (
    id: string,
    field: keyof SkillCategory,
    value: string | string[]
  ) => {
    onChange(
      data.map((cat) => (cat.id === id ? { ...cat, [field]: value } : cat))
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

  const addSkill = (categoryId: string) => {
    const skillName = newSkillInputs[categoryId]?.trim();
    if (!skillName) return;

    const category = data.find((cat) => cat.id === categoryId);
    if (category && !category.skills.includes(skillName)) {
      updateCategory(categoryId, "skills", [...category.skills, skillName]);
    }
    setNewSkillInputs({ ...newSkillInputs, [categoryId]: "" });
  };

  const removeSkill = (categoryId: string, skillIndex: number) => {
    const category = data.find((cat) => cat.id === categoryId);
    if (category) {
      const newSkills = category.skills.filter((_, i) => i !== skillIndex);
      updateCategory(categoryId, "skills", newSkills);
    }
  };

  const moveCategory = (index: number, direction: "up" | "down") => {
    const newData = [...data];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= data.length) return;
    [newData[index], newData[newIndex]] = [newData[newIndex], newData[index]];
    onChange(newData);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    categoryId: string
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(categoryId);
    }
  };

  const suggestedCategories = [
    "Programming Languages",
    "Frameworks & Libraries",
    "Tools & Technologies",
    "Soft Skills",
    "Languages",
    "Databases",
    "Cloud & DevOps",
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Organize your skills into categories for better readability.
        </p>
        <Button onClick={addCategory} size="sm" className="gap-2">
          <Plus className="size-4" />
          Add Category
        </Button>
      </div>

      {data.length === 0 && (
        <div className="space-y-4">
          <div className="text-center py-8 text-muted-foreground border border-dashed rounded-lg">
            <Layers className="size-12 mx-auto mb-4 opacity-50" />
            <p>No skill categories added yet.</p>
            <p className="text-sm mb-4">
              Click the button above or use a suggested category below.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestedCategories.map((name) => (
              <Button
                key={name}
                variant="outline"
                size="sm"
                onClick={() => {
                  const newCat = { ...createSkillCategory(), name };
                  onChange([...data, newCat]);
                  setExpandedIds(new Set([...expandedIds, newCat.id]));
                }}
              >
                <Plus className="size-3 mr-1" />
                {name}
              </Button>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence mode="popLayout">
        {data.map((cat, index) => (
          <motion.div
            key={cat.id}
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
                        onClick={() => moveCategory(index, "up")}
                        disabled={index === 0}
                        className="h-4 w-4"
                      >
                        <ChevronUp className="size-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => moveCategory(index, "down")}
                        disabled={index === data.length - 1}
                        className="h-4 w-4"
                      >
                        <ChevronDown className="size-3" />
                      </Button>
                    </div>
                    <GripVertical className="size-4 text-muted-foreground" />
                    <CardTitle
                      className="text-base cursor-pointer flex items-center gap-2"
                      onClick={() => toggleExpand(cat.id)}
                    >
                      {cat.name || (
                        <span className="text-muted-foreground">
                          New Category
                        </span>
                      )}
                      <Badge variant="secondary" className="ml-2">
                        {cat.skills.length} skills
                      </Badge>
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => toggleExpand(cat.id)}
                    >
                      {expandedIds.has(cat.id) ? (
                        <ChevronUp className="size-4" />
                      ) : (
                        <ChevronDown className="size-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeCategory(cat.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <AnimatePresence>
                {expandedIds.has(cat.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Layers className="size-4 text-muted-foreground" />
                          Category Name
                        </Label>
                        <Input
                          placeholder="e.g., Programming Languages"
                          value={cat.name}
                          onChange={(e) =>
                            updateCategory(cat.id, "name", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Skills</Label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Type a skill and press Enter"
                            value={newSkillInputs[cat.id] || ""}
                            onChange={(e) =>
                              setNewSkillInputs({
                                ...newSkillInputs,
                                [cat.id]: e.target.value,
                              })
                            }
                            onKeyDown={(e) => handleKeyDown(e, cat.id)}
                          />
                          <Button
                            onClick={() => addSkill(cat.id)}
                            size="icon"
                            variant="secondary"
                          >
                            <Plus className="size-4" />
                          </Button>
                        </div>

                        {cat.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            <AnimatePresence>
                              {cat.skills.map((skill, skillIndex) => (
                                <motion.div
                                  key={skill}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  <Badge
                                    variant="secondary"
                                    className="gap-1 pr-1"
                                  >
                                    {skill}
                                    <button
                                      onClick={() =>
                                        removeSkill(cat.id, skillIndex)
                                      }
                                      className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20 transition-colors"
                                    >
                                      <X className="size-3" />
                                    </button>
                                  </Badge>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </div>
                        )}

                        {cat.skills.length === 0 && (
                          <p className="text-sm text-muted-foreground text-center py-4 border border-dashed rounded">
                            No skills added yet. Type a skill above and press
                            Enter.
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

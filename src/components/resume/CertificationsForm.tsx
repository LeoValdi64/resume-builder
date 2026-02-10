"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Certification, createCertification } from "@/types/resume";
import {
  Award,
  Building2,
  Calendar,
  Link,
  Hash,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  GripVertical,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CertificationsFormProps {
  data: Certification[];
  onChange: (data: Certification[]) => void;
}

export function CertificationsForm({
  data,
  onChange,
}: CertificationsFormProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(data.map((cert) => cert.id))
  );

  const addCertification = () => {
    const newCert = createCertification();
    onChange([...data, newCert]);
    setExpandedIds(new Set([...expandedIds, newCert.id]));
  };

  const removeCertification = (id: string) => {
    onChange(data.filter((cert) => cert.id !== id));
    const newExpanded = new Set(expandedIds);
    newExpanded.delete(id);
    setExpandedIds(newExpanded);
  };

  const updateCertification = (
    id: string,
    field: keyof Certification,
    value: string
  ) => {
    onChange(
      data.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert))
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

  const moveCertification = (index: number, direction: "up" | "down") => {
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
          Add professional certifications to showcase your expertise.
        </p>
        <Button onClick={addCertification} size="sm" className="gap-2">
          <Plus className="size-4" />
          Add Certification
        </Button>
      </div>

      <AnimatePresence mode="popLayout">
        {data.map((cert, index) => (
          <motion.div
            key={cert.id}
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
                        onClick={() => moveCertification(index, "up")}
                        disabled={index === 0}
                        className="h-4 w-4"
                      >
                        <ChevronUp className="size-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => moveCertification(index, "down")}
                        disabled={index === data.length - 1}
                        className="h-4 w-4"
                      >
                        <ChevronDown className="size-3" />
                      </Button>
                    </div>
                    <GripVertical className="size-4 text-muted-foreground" />
                    <CardTitle
                      className="text-base cursor-pointer flex items-center gap-2"
                      onClick={() => toggleExpand(cert.id)}
                    >
                      {cert.name || cert.issuer ? (
                        <>
                          <span>{cert.name || "Certification"}</span>
                          {cert.issuer && (
                            <span className="text-muted-foreground font-normal">
                              by {cert.issuer}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-muted-foreground">
                          New Certification
                        </span>
                      )}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => toggleExpand(cert.id)}
                    >
                      {expandedIds.has(cert.id) ? (
                        <ChevronUp className="size-4" />
                      ) : (
                        <ChevronDown className="size-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeCertification(cert.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <AnimatePresence>
                {expandedIds.has(cert.id) && (
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
                            <Award className="size-4 text-muted-foreground" />
                            Certification Name
                          </Label>
                          <Input
                            placeholder="AWS Solutions Architect"
                            value={cert.name}
                            onChange={(e) =>
                              updateCertification(cert.id, "name", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Building2 className="size-4 text-muted-foreground" />
                            Issuing Organization
                          </Label>
                          <Input
                            placeholder="Amazon Web Services"
                            value={cert.issuer}
                            onChange={(e) =>
                              updateCertification(
                                cert.id,
                                "issuer",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Calendar className="size-4 text-muted-foreground" />
                            Issue Date
                          </Label>
                          <Input
                            type="month"
                            value={cert.date}
                            onChange={(e) =>
                              updateCertification(cert.id, "date", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Calendar className="size-4 text-muted-foreground" />
                            Expiration Date (Optional)
                          </Label>
                          <Input
                            type="month"
                            value={cert.expirationDate}
                            onChange={(e) =>
                              updateCertification(
                                cert.id,
                                "expirationDate",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Hash className="size-4 text-muted-foreground" />
                            Credential ID (Optional)
                          </Label>
                          <Input
                            placeholder="ABC123XYZ"
                            value={cert.credentialId}
                            onChange={(e) =>
                              updateCertification(
                                cert.id,
                                "credentialId",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Link className="size-4 text-muted-foreground" />
                            Credential URL (Optional)
                          </Label>
                          <Input
                            type="url"
                            placeholder="https://credential.url/verify"
                            value={cert.url}
                            onChange={(e) =>
                              updateCertification(cert.id, "url", e.target.value)
                            }
                          />
                        </div>
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
          <Award className="size-12 mx-auto mb-4 opacity-50" />
          <p>No certifications added yet.</p>
          <p className="text-sm">
            Click the button above to add your certifications.
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PersonalInfo } from "@/types/resume";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
} from "lucide-react";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="flex items-center gap-2">
            <User className="size-4 text-muted-foreground" />
            First Name
          </Label>
          <Input
            id="firstName"
            placeholder="John"
            value={data.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="flex items-center gap-2">
            <User className="size-4 text-muted-foreground" />
            Last Name
          </Label>
          <Input
            id="lastName"
            placeholder="Doe"
            value={data.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="size-4 text-muted-foreground" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="size-4 text-muted-foreground" />
            Phone
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="flex items-center gap-2">
          <MapPin className="size-4 text-muted-foreground" />
          Location
        </Label>
        <Input
          id="location"
          placeholder="San Francisco, CA"
          value={data.location}
          onChange={(e) => handleChange("location", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website" className="flex items-center gap-2">
          <Globe className="size-4 text-muted-foreground" />
          Website
        </Label>
        <Input
          id="website"
          type="url"
          placeholder="https://johndoe.com"
          value={data.website}
          onChange={(e) => handleChange("website", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="linkedin" className="flex items-center gap-2">
            <Linkedin className="size-4 text-muted-foreground" />
            LinkedIn
          </Label>
          <Input
            id="linkedin"
            placeholder="linkedin.com/in/johndoe"
            value={data.linkedin}
            onChange={(e) => handleChange("linkedin", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="github" className="flex items-center gap-2">
            <Github className="size-4 text-muted-foreground" />
            GitHub
          </Label>
          <Input
            id="github"
            placeholder="github.com/johndoe"
            value={data.github}
            onChange={(e) => handleChange("github", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

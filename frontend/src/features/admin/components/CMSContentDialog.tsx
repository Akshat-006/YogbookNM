"use client";

import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CMSContent } from "../types/cms.types";
import { uploadCMSAsset } from "../services/cms.service";

interface Props {
  open: boolean;
  item?: CMSContent | null;
  defaultKey?: string;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: Record<string, unknown>) => void;
  isPending?: boolean;
}

type CMSFormState = {
  key: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: string;
  button_text: string;
  button_link: string;
  is_active: boolean;
};

const emptyForm: CMSFormState = {
  key: "",
  title: "",
  subtitle: "",
  description: "",
  image: "",
  icon: "",
  button_text: "",
  button_link: "",
  is_active: true,
};

function toFormState(item?: CMSContent | null, defaultKey?: string): CMSFormState {
  if (!item) {
    return {
      ...emptyForm,
      key: defaultKey ?? "",
    };
  }

  return {
    key: item.key ?? defaultKey ?? "",
    title: item.title ?? "",
    subtitle: item.subtitle ?? "",
    description: item.description ?? "",
    image: item.image ?? "",
    icon: item.icon ?? "",
    button_text: item.button_text ?? "",
    button_link: item.button_link ?? "",
    is_active: Boolean(item.is_active),
  };
}

export function CMSContentDialog({ open, item, defaultKey, onOpenChange, onSubmit, isPending }: Props) {
  const [form, setForm] = useState<CMSFormState>(toFormState(item, defaultKey));
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const updateField = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpload = async (field: "image" | "icon", event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);
      const result = await uploadCMSAsset(file);
      updateField(field, result.url);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{item ? "Edit CMS block" : "Create CMS block"}</DialogTitle>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit({
              ...form,
              is_active: Boolean(form.is_active),
            });
          }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="key">Key</Label>
              <Input
                id="key"
                value={form.key}
                onChange={(event) => updateField("key", event.target.value)}
                placeholder="hero"
                required
                disabled={Boolean(item)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={form.title as string}
                onChange={(event) => updateField("title", event.target.value)}
                placeholder="Amazing wellbeing"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              value={form.subtitle as string}
              onChange={(event) => updateField("subtitle", event.target.value)}
              placeholder="Short supporting text"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={form.description as string}
              onChange={(event) => updateField("description", event.target.value)}
              rows={4}
              placeholder="Long-form content for the public site"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <Input id="image" type="file" accept="image/*" onChange={(event) => handleUpload("image", event)} />
              <Input
                value={form.image as string}
                onChange={(event) => updateField("image", event.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Input id="icon" type="file" accept="image/*" onChange={(event) => handleUpload("icon", event)} />
              <Input
                value={form.icon as string}
                onChange={(event) => updateField("icon", event.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="button_text">Button text</Label>
              <Input
                id="button_text"
                value={form.button_text as string}
                onChange={(event) => updateField("button_text", event.target.value)}
                placeholder="Explore classes"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="button_link">Button link</Label>
              <Input
                id="button_link"
                value={form.button_link as string}
                onChange={(event) => updateField("button_link", event.target.value)}
                placeholder="/classes"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={Boolean(form.is_active)}
              onChange={(event) => updateField("is_active", event.target.checked)}
            />
            Show on public site
          </label>

          {uploadError ? <p className="text-sm text-red-500">{uploadError}</p> : null}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || isUploading}>
              {isPending ? "Saving..." : item ? "Save changes" : "Create block"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

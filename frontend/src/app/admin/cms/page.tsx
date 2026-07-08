"use client";

import { useState } from "react";
import { HeartHandshake, LayoutTemplate, Sparkles, ShieldCheck, Users } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { CMSContentDialog } from "@/features/admin/components/CMSContentDialog";
import { CMSContentList } from "@/features/admin/components/CMSContentList";
import { useCMS } from "@/features/admin/hooks/useCMS";
import { createCMSContent, deleteCMSContent, updateCMSContent } from "@/features/admin/services/cms.service";
import { CMSContent } from "@/features/admin/types/cms.types";

export default function AdminCMSPage() {
  const queryClient = useQueryClient();
  const { data = [], isLoading, isError } = useCMS();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CMSContent | null>(null);
  const [defaultKey, setDefaultKey] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const landingBlocks = [
    {
      key: "hero",
      title: "Hero section",
      description: "Top section content for the landing page hero banner.",
      icon: Sparkles,
    },
    {
      key: "about",
      title: "About section",
      description: "The about section content shown on the homepage.",
      icon: ShieldCheck,
    },
    {
      key: "contact",
      title: "Contact section",
      description: "Contact CTA content and button for the homepage.",
      icon: LayoutTemplate,
    },
    {
      key: "experts",
      title: "Experts section",
      description: "Showcase your certified instructors and wellness experts.",
      icon: Users,
    },
    {
      key: "benefits",
      title: "Benefits section",
      description: "Highlight the main benefits of yoga practice for visitors.",
      icon: HeartHandshake,
    },
  ];

  const createMutation = useMutation({
    mutationFn: createCMSContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-cms"] });
      setIsDialogOpen(false);
      setSelectedItem(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Record<string, unknown> }) => updateCMSContent(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-cms"] });
      setIsDialogOpen(false);
      setSelectedItem(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCMSContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-cms"] });
      setDeletingId(null);
    },
  });

  const handleSubmit = (payload: Record<string, unknown>) => {
    if (selectedItem) {
      updateMutation.mutate({ id: selectedItem._id, payload });
      return;
    }

    createMutation.mutate(payload);
  };

  const handleDelete = (item: CMSContent) => {
    if (!window.confirm(`Delete ${item.key}?`)) {
      return;
    }

    setDeletingId(item._id);
    deleteMutation.mutate(item._id);
  };

  return (
    <div className="space-y-8 p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">CMS Content</h1>
          <p className="text-sm text-muted-foreground">
            Manage the content blocks that power the public site.
          </p>
        </div>
        <Button
          onClick={() => {
            setSelectedItem(null);
            setDefaultKey(null);
            setIsDialogOpen(true);
          }}
        >
          Create new block
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {landingBlocks.map((block) => {
          const Icon = block.icon;
          const existing = data.find((item) => item.key === block.key);

          return (
            <div key={block.key} className="rounded-3xl border bg-background p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </span>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{block.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{block.description}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedItem(existing ?? null);
                    setDefaultKey(block.key);
                    setIsDialogOpen(true);
                  }}
                >
                  {existing ? "Edit" : "Create"}
                </Button>
                <span className="text-sm text-muted-foreground">{existing ? "Exists" : "Not created"}</span>
              </div>
            </div>
          );
        })}
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Loading CMS content...</p>}
      {isError && <p className="text-sm text-red-500">Unable to load CMS content.</p>}
      {!isLoading && !isError && (
        <CMSContentList
          items={data}
          onEdit={(item) => {
            setSelectedItem(item);
            setIsDialogOpen(true);
          }}
          onDelete={handleDelete}
          deletingId={deletingId}
        />
      )}

      <CMSContentDialog
        key={`${selectedItem?._id ?? defaultKey ?? "new"}-${isDialogOpen ? "open" : "closed"}`}
        open={isDialogOpen}
        item={selectedItem}
        defaultKey={defaultKey ?? undefined}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setSelectedItem(null);
            setDefaultKey(null);
          }
        }}
        onSubmit={handleSubmit}
        isPending={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}

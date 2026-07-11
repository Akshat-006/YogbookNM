"use client";

import { useState } from "react";
import { HelpCircle, Plus, Pencil, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CMSContentDialog } from "@/features/admin/components/CMSContentDialog";
import { useCMS } from "@/features/admin/hooks/useCMS";
import { createCMSContent, deleteCMSContent, updateCMSContent } from "@/features/admin/services/cms.service";
import { CMSContent } from "@/features/admin/types/cms.types";

export default function AdminFAQPage() {
  const queryClient = useQueryClient();
  const { data = [], isLoading, isError } = useCMS();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CMSContent | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Filter FAQs (keys starting with faq_) and sort by order ascending, then by key
  const faqs = data
    .filter((item) => item.key.startsWith("faq_"))
    .sort((a, b) => {
      const orderA = a.order !== undefined && a.order !== null ? Number(a.order) : 9999;
      const orderB = b.order !== undefined && b.order !== null ? Number(b.order) : 9999;
      if (orderA !== orderB) return orderA - orderB;
      return a.key.localeCompare(b.key);
    });

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

    // Auto-generate key for new FAQ to prevent collision and simplify user input
    const generatedKey = `faq_${Date.now()}`;
    createMutation.mutate({ ...payload, key: generatedKey });
  };

  const handleDelete = (item: CMSContent) => {
    if (!window.confirm(`Are you sure you want to delete this FAQ?`)) {
      return;
    }

    setDeletingId(item._id);
    deleteMutation.mutate(item._id);
  };

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <HelpCircle className="size-6 text-primary" />
            <h1 className="text-3xl font-bold">FAQ CMS</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage the Frequently Asked Questions displayed on the public site.
          </p>
        </div>
        <Button
          onClick={() => {
            setSelectedItem(null);
            setIsDialogOpen(true);
          }}
          className="rounded-full bg-primary font-semibold text-primary-foreground shadow-md transition-all hover:-translate-y-0.5"
        >
          <Plus className="mr-2 size-4" />
          Add FAQ
        </Button>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Loading FAQs...</p>}
      {isError && <p className="text-sm text-red-500">Unable to load FAQ list.</p>}

      {!isLoading && !isError && (
        <div className="space-y-4">
          {faqs.length === 0 ? (
            <div className="rounded-2xl border border-dashed p-12 text-center text-muted-foreground">
              No FAQs created yet. Click "Add FAQ" to create your first one.
            </div>
          ) : (
            <div className="grid gap-5">
              {faqs.map((faq) => (
                <Card
                  key={faq._id}
                  className="group rounded-2xl border-border shadow-sm transition-all hover:shadow-premium"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                            Order: {faq.order ?? "—"}
                          </span>
                          <span className={faq.is_active ? "pill-success" : "pill-neutral"}>
                            {faq.is_active ? "Published" : "Draft"}
                          </span>
                        </div>
                        <h3 className="font-heading text-lg font-bold leading-snug">
                          {faq.title ?? "Untitled Question"}
                        </h3>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                          {faq.description ?? "No answer text provided."}
                        </p>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary"
                          onClick={() => {
                            setSelectedItem(faq);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-xl hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleDelete(faq)}
                          disabled={deletingId === faq._id}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      <CMSContentDialog
        key={`${selectedItem?._id ?? "new"}-${isDialogOpen ? "open" : "closed"}`}
        open={isDialogOpen}
        item={selectedItem}
        defaultKey={selectedItem ? undefined : "faq_"}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setSelectedItem(null);
          }
        }}
        onSubmit={handleSubmit}
        isPending={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}

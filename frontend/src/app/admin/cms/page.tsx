"use client";

import { useState } from "react";
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
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
            setIsDialogOpen(true);
          }}
        >
          Create new block
        </Button>
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
        key={`${selectedItem?._id ?? "new"}-${isDialogOpen ? "open" : "closed"}`}
        open={isDialogOpen}
        item={selectedItem}
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

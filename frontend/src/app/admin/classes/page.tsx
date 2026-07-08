"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import { ClassTable } from "@/features/admin/components/ClassTable";
import { CreateClassDialog } from "@/features/admin/components/CreateClassDialog";
import { EditClassDialog } from "@/features/admin/components/EditClassDialog";
import { DeleteClassDialog } from "@/features/admin/components/DeleteClassDialog";

import {
  useClasses,
  useCreateClass,
  useUpdateClass,
  useDeleteClass,
} from "@/features/admin/hooks/useClasses";

import { AdminClass } from "@/features/admin/types/class.types";
import { toast } from "sonner";

function AdminClassesContent() {
  const searchParams = useSearchParams();
  const { data = [], isLoading } = useClasses();

  const createClass = useCreateClass();
  const updateClass = useUpdateClass();
  const deleteClass = useDeleteClass();

  const [createOpen, setCreateOpen] = useState(searchParams?.get("create") === "1");

  const [editOpen, setEditOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedClass, setSelectedClass] =
    useState<AdminClass | null>(null);

  function normalizeClassPayload(values: Record<string, unknown>) {
    const payload = { ...values };

    if (typeof payload.schedule_datetime === "string" && payload.schedule_datetime) {
      const parsed = new Date(payload.schedule_datetime);
      payload.schedule_datetime = parsed.toISOString();
    }

    if (typeof payload.recurring_until === "string" && payload.recurring_until) {
      const parsed = new Date(payload.recurring_until);
      payload.recurring_until = parsed.toISOString();
    }

    return payload;
  }

  async function handleCreate(values: Record<string, unknown>) {
    try {
      await createClass.mutateAsync(normalizeClassPayload(values));
      setCreateOpen(false);
      toast.success("Class created successfully!");
    } catch {
      toast.error("Failed to create class.");
    }
  }

  async function handleUpdate(values: Record<string, unknown>) {
    if (!selectedClass) return;
    try {
      await updateClass.mutateAsync({
        id: selectedClass._id,
        payload: normalizeClassPayload(values),
      });
      setEditOpen(false);
      toast.success("Class updated successfully!");
    } catch {
      toast.error("Failed to update class.");
    }
  }

  async function handleDelete() {
    if (!selectedClass) return;
    try {
      await deleteClass.mutateAsync(selectedClass._id);
      setDeleteOpen(false);
      toast.success("Class deleted successfully!");
    } catch {
      toast.error("Failed to delete class.");
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4 p-8">
        <div className="h-10 w-48 animate-pulse rounded-xl bg-muted/60" />
        <div className="h-64 animate-pulse rounded-2xl bg-muted/60" />
      </div>
    );
  }

  return (

    <div className="space-y-8 p-8">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Admin</p>
          <h1 className="font-heading mt-1 text-3xl font-bold tracking-tight">Yoga Classes</h1>
        </div>

        <Button
          className="rounded-full bg-primary px-6 font-semibold text-primary-foreground shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all"
          onClick={() =>
            setCreateOpen(true)
          }
        >

          Create Class

        </Button>

      </div>

      <ClassTable

        classes={data}

        onEdit={(item) => {

          setSelectedClass(item);

          setEditOpen(true);

        }}

        onDelete={(id) => {

          const cls = data.find(
            (c) => c._id === id
          );

          if (!cls) return;

          setSelectedClass(cls);

          setDeleteOpen(true);

        }}

      />

      <CreateClassDialog

        open={createOpen}

        onOpenChange={setCreateOpen}

        onSubmit={handleCreate}

        loading={createClass.isPending}

      />

      <EditClassDialog

        open={editOpen}

        onOpenChange={setEditOpen}

        yogaClass={selectedClass}

        onSubmit={handleUpdate}

        loading={updateClass.isPending}

      />

      <DeleteClassDialog

        open={deleteOpen}

        onOpenChange={setDeleteOpen}

        onDelete={handleDelete}

        loading={deleteClass.isPending}

      />

    </div>

  );
}

export default function AdminClassesPage() {
  return (
    <Suspense fallback={
      <div className="space-y-4 p-8">
        <div className="h-10 w-48 animate-pulse rounded-xl bg-muted/60" />
        <div className="h-64 animate-pulse rounded-2xl bg-muted/60" />
      </div>
    }>
      <AdminClassesContent />
    </Suspense>
  );
}
"use client";

import { useState } from "react";

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

export default function AdminClassesPage() {

  const { data = [], isLoading } = useClasses();

  const createClass = useCreateClass();
  const updateClass = useUpdateClass();
  const deleteClass = useDeleteClass();

  const [createOpen, setCreateOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedClass, setSelectedClass] =
    useState<AdminClass | null>(null);

  async function handleCreate(values: any) {

    await createClass.mutateAsync(values);

    setCreateOpen(false);

  }

  async function handleUpdate(values: any) {

    if (!selectedClass) return;

    await updateClass.mutateAsync({

      id: selectedClass._id,

      payload: values,

    });

    setEditOpen(false);

  }

  async function handleDelete() {

    if (!selectedClass) return;

    await deleteClass.mutateAsync(selectedClass._id);

    setDeleteOpen(false);

  }

  if (isLoading) {

    return <p className="p-10">Loading...</p>;

  }

  return (

    <div className="space-y-8 p-8">

      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold">

          Yoga Classes

        </h1>

        <Button
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
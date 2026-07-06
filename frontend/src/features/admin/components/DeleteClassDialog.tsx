"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onDelete: () => void;
  loading?: boolean;
}

export function DeleteClassDialog({
  open,
  onOpenChange,
  onDelete,
  loading,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>

        <DialogHeader>

          <DialogTitle>

            Delete Class

          </DialogTitle>

        </DialogHeader>

        <p>

          Are you sure you want to delete
          this class?

        </p>

        <div className="flex justify-end gap-3">

          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            disabled={loading}
            onClick={onDelete}
          >
            Delete
          </Button>

        </div>

      </DialogContent>
    </Dialog>
  );
}
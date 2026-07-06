"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import { useState } from "react";

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  loading?: boolean;

  currentStatus: string;

  onSubmit: (status: string) => void;
}

export function UpdateAppointmentDialog({
  open,
  onOpenChange,
  loading,
  currentStatus,
  onSubmit,
}: Props) {
  const [status, setStatus] =
    useState(currentStatus);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>

        <DialogHeader>

          <DialogTitle>

            Update Appointment

          </DialogTitle>

        </DialogHeader>

        <Select
          value={status}
          onValueChange={setStatus}
        >
          <SelectTrigger>

            <SelectValue />

          </SelectTrigger>

          <SelectContent>

            <SelectItem value="booked">
              Booked
            </SelectItem>

            <SelectItem value="completed">
              Completed
            </SelectItem>

            <SelectItem value="cancelled">
              Cancelled
            </SelectItem>

          </SelectContent>

        </Select>

        <Button
          className="w-full"
          disabled={loading}
          onClick={() =>
            onSubmit(status)
          }
        >
          Save
        </Button>

      </DialogContent>
    </Dialog>
  );
}
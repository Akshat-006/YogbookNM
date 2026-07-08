"use client";

import {
  Dialog,
  DialogContent,
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
      <DialogContent className="sm:max-w-sm overflow-hidden p-0">
        <div className="bg-gradient-to-br from-primary/12 via-primary/6 to-accent/6 px-6 py-5">
          <DialogTitle className="font-heading text-lg font-bold">
            Update Appointment
          </DialogTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            Change the appointment status below.
          </p>
        </div>

        <div className="space-y-5 px-6 py-6">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Status
            </label>
            <Select
              value={status}
              onValueChange={setStatus}
            >
              <SelectTrigger className="rounded-xl border-border focus:ring-primary/30">

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
          </div>

          <Button
            className="h-11 w-full rounded-xl bg-primary font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
            disabled={loading}
            onClick={() =>
              onSubmit(status)
            }
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
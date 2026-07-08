"use client";

import { useState } from "react";

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

interface Props {
  open: boolean;

  onOpenChange: (
    value: boolean
  ) => void;

  bookingStatus: string;

  paymentStatus: string;

  loading?: boolean;

  onSubmit: (
    bookingStatus: string,
    paymentStatus: string
  ) => void;
}

export function UpdateBookingDialog({
  open,
  onOpenChange,
  bookingStatus,
  paymentStatus,
  loading,
  onSubmit,
}: Props) {

  const [
    booking,
    setBooking,
  ] = useState(bookingStatus);

  const [
    payment,
    setPayment,
  ] = useState(paymentStatus);

  return (

    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >

      <DialogContent className="sm:max-w-sm overflow-hidden p-0">
        <div className="bg-gradient-to-br from-primary/12 via-primary/6 to-accent/6 px-6 py-5">
          <DialogTitle className="font-heading text-lg font-bold">
            Update Booking
          </DialogTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            Update booking and payment status below.
          </p>
        </div>

        <div className="space-y-4 px-6 py-6">
          {/* Booking status */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Booking Status
            </label>
            <Select
              value={booking}
              onValueChange={setBooking}
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

          {/* Payment status */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Payment Status
            </label>
            <Select
              value={payment}
              onValueChange={setPayment}
            >

              <SelectTrigger className="rounded-xl border-border focus:ring-primary/30">

                <SelectValue />

              </SelectTrigger>

              <SelectContent>

                <SelectItem value="pending">
                  Pending
                </SelectItem>

                <SelectItem value="paid">
                  Paid
                </SelectItem>

                <SelectItem value="failed">
                  Failed
                </SelectItem>

              </SelectContent>

            </Select>
          </div>

          <Button
            className="h-11 w-full rounded-xl bg-primary font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
            disabled={loading}
            onClick={() =>
              onSubmit(
                booking,
                payment
              )
            }
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>

      </DialogContent>

    </Dialog>

  );
}
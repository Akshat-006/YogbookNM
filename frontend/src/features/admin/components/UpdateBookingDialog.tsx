"use client";

import { useState } from "react";

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

      <DialogContent>

        <DialogHeader>

          <DialogTitle>

            Update Booking

          </DialogTitle>

        </DialogHeader>

        <Select
          value={booking}
          onValueChange={setBooking}
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

        <Select
          value={payment}
          onValueChange={setPayment}
        >

          <SelectTrigger>

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

        <Button
          className="w-full"
          disabled={loading}
          onClick={() =>
            onSubmit(
              booking,
              payment
            )
          }
        >
          Save Changes
        </Button>

      </DialogContent>

    </Dialog>

  );
}
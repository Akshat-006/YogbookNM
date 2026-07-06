"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  bookingSchema,
  BookingFormData,
} from "../schemas/booking.schema";

import { useCreateBooking } from "../hooks/useCreateBooking";

interface Props {
  classId: string;
}

export function BookClassDialog({ classId }: Props) {
  const mutation = useCreateBooking();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  async function onSubmit(values: BookingFormData) {
    await mutation.mutateAsync({
      class_id: classId,
      ...values,
    });

    reset();

    window.location.href =
    `/payments?booking=${response.booking_id}`;
}

  return (
    <Dialog>

      <DialogTrigger asChild>

        <Button
          size="lg"
          className="rounded-full"
        >
          Book This Class
        </Button>

      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Book Your Yoga Class
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <Input
            placeholder="Full Name"
            {...register("name")}
          />

          {errors.name && (
            <p className="text-sm text-red-500">
              {errors.name.message}
            </p>
          )}

          <Input
            placeholder="Email"
            {...register("email")}
          />

          <Input
            placeholder="Phone"
            {...register("phone")}
          />

          <Textarea
            placeholder="Notes (optional)"
            {...register("notes")}
          />

          <Button
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending
              ? "Booking..."
              : "Confirm Booking"}
          </Button>

        </form>

      </DialogContent>

    </Dialog>
  );
}
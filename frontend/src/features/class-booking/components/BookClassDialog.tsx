"use client";

import { useState } from "react";
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
import { useCreatePayment } from "@/features/payments/hooks/useCreatePayment";
import { useVerifyPayment } from "@/features/payments/hooks/useVerifyPayment";
import { loadRazorpay } from "@/lib/loadRazorpay";
import { useRouter } from "next/navigation";

interface Props {
  classId: string;
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export function BookClassDialog({ classId }: Props) {
  const [open, setOpen] = useState(false);

  const booking = useCreateBooking();
  const payment = useCreatePayment();
  const verify = useVerifyPayment();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  async function onSubmit(values: BookingFormData) {
    try {
      const bookingResponse = await booking.mutateAsync({
        class_id: classId,
        ...values,
      });

      const order = await payment.mutateAsync({
        booking_id: bookingResponse.booking_id,
      });

      const loaded = await loadRazorpay();

      if (!loaded) {
        throw new Error("Unable to load Razorpay.");
      }

      const razorpay = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        order_id: order.order_id,

        name: "Yogbook",

        description: "Yoga Class Booking",

        timeout: 300,

        handler: async function (response: RazorpayResponse) {
          try {
            await verify.mutateAsync({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            setOpen(false);

            reset();

            router.push("/booking-success");
          } catch {
            alert("Payment verification failed.");
          }
        },

        modal: {
          ondismiss() {
            console.log("Payment cancelled");
          },
        },

        prefill: {
          name: values.name,
          email: values.email,
          contact: values.phone,
        },

        theme: {
          color: "#179288",
        },
      });

      razorpay.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="rounded-full">
          Book This Class
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Your Yoga Class</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input placeholder="Full Name" {...register("name")} />

          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}

          <Input placeholder="Email" {...register("email")} />

          <Input placeholder="Phone" {...register("phone")} />

          <Textarea placeholder="Notes (optional)" {...register("notes")} />

          <Button
            className="w-full"
            disabled={
              booking.isPending || payment.isPending || verify.isPending
            }
          >
            {booking.isPending
              ? "Creating Booking..."
              : payment.isPending
              ? "Creating Payment..."
              : verify.isPending
              ? "Verifying Payment..."
              : "Continue to Payment"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
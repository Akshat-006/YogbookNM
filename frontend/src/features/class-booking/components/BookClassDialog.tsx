"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
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
import { User, Mail, Phone, FileText, CreditCard } from "lucide-react";

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
          color: "#2D6A4F",
        },
      });

      razorpay.open();
    } catch (error: unknown) {
      console.error(error);
      alert(
        (error as any)?.response?.data?.detail ||
          "Something went wrong. Please check your input and try again."
      );
    }
  }

  const isPending = booking.isPending || payment.isPending || verify.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="rounded-full bg-primary px-8 font-semibold text-primary-foreground shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl"
        >
          Book This Class
        </Button>
      </DialogTrigger>

      <DialogContent className="overflow-hidden p-0 sm:max-w-md">
        {/* Header strip */}
        <div className="bg-gradient-to-br from-primary/15 via-primary/8 to-accent/8 px-8 py-7">
          <DialogTitle className="font-heading text-2xl font-bold tracking-tight">
            Book Your Yoga Class
          </DialogTitle>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Fill in your details to reserve your spot.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-8 py-7">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Full Name"
              {...register("name")}
              className="h-11 rounded-xl border-border pl-10 focus-visible:ring-primary/30"
            />
          </div>
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Email Address"
              {...register("email")}
              className="h-11 rounded-xl border-border pl-10 focus-visible:ring-primary/30"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Phone Number"
              {...register("phone")}
              className="h-11 rounded-xl border-border pl-10 focus-visible:ring-primary/30"
            />
          </div>

          {/* Notes */}
          <div className="relative">
            <FileText className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
            <Textarea
              placeholder="Any special notes? (optional)"
              {...register("notes")}
              className="min-h-[80px] rounded-xl border-border pl-10 focus-visible:ring-primary/30"
            />
          </div>

          <Button
            type="submit"
            className="h-12 w-full rounded-xl bg-primary font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg disabled:opacity-70"
            disabled={isPending}
          >
            <CreditCard className="mr-2 size-4" />
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
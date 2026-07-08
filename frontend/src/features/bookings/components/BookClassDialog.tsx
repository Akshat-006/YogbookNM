"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreatePayment } from "@/features/payments/hooks/useCreatePayment";
import { useVerifyPayment } from "@/features/payments/hooks/useVerifyPayment";
import { loadRazorpay } from "@/lib/loadRazorpay";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

import { LoginDialog } from "@/features/auth/components/LoginDialog";
import { bookingSchema, BookingFormData } from "../schemas/booking.schema";

import { useCreateBooking } from "../hooks/useCreateBooking";

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
  const [loginOpen, setLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    checkAuth();
    window.addEventListener("authChanged", checkAuth as EventListener);

    return () => window.removeEventListener("authChanged", checkAuth as EventListener);
  }, []);

  // Components
  const booking = useCreateBooking();
  const payment = useCreatePayment();
  const verify = useVerifyPayment();
  const router = useRouter();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  async function onSubmit(values: BookingFormData) {
    if (!isAuthenticated) {
      setLoginOpen(true);
      return;
    }

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
            form.reset();
            toast.success("Class booked successfully!");
            router.push("/booking-success");
          } catch {
            toast.error("Payment verification failed.");
          }
        },

        modal: {
          ondismiss() {
            toast.warning("Payment cancelled.");
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
      toast.error("Something went wrong.");
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
          <DialogTitle>Book Yoga Class</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <Input placeholder="Full Name" {...form.register("name")} />

          <Input placeholder="Email" {...form.register("email")} />

          <Input placeholder="Phone" {...form.register("phone")} />

          <Textarea placeholder="Notes" {...form.register("notes")} />

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
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </Dialog>
  );
}

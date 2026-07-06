"use client";

import { Button } from "@/components/ui/button";

import { useCreatePayment } from "../hooks/useCreatePayment";
import { useVerifyPayment } from "../hooks/useVerifyPayment";

import { loadRazorpay } from "@/lib/loadRazorpay";

interface Props {
  bookingId: string;
}

export function PaymentButton({
  bookingId,
}: Props) {

  const createPayment =
    useCreatePayment();

  const verifyPayment =
    useVerifyPayment();

  async function handlePayment() {

  if (
    createPayment.isPending ||
    verifyPayment.isPending
  ) {
    return;
  }

  const loaded = await loadRazorpay();

  if (!loaded) {
    alert("Unable to load Razorpay.");
    return;
  }

  const order = await createPayment.mutateAsync(
    bookingId
  );

  const options = {

    key:
      process.env
        .NEXT_PUBLIC_RAZORPAY_KEY_ID,

    amount: order.amount,

    currency: order.currency,

    order_id: order.order_id,

    name: "Yogbook",

    description: "Yoga Class Booking",

    handler: async (
      response: any
    ) => {

      const verified =
        await verifyPayment.mutateAsync({

          razorpay_order_id:
            response.razorpay_order_id,

          razorpay_payment_id:
            response.razorpay_payment_id,

          razorpay_signature:
            response.razorpay_signature,

        });

      if (!verified.success) {

        alert("Payment verification failed.");

        return;

      }

      window.location.href =
        `/booking-success?booking=${bookingId}`;

    },

    modal: {

      ondismiss() {

        alert("Payment cancelled.");

      },

    },

    theme: {

      color: "#7C3AED",

    },

  };

  const payment = new (window as any).Razorpay(
    options
  );

  payment.open();
  }
  return (

    <Button
      className="w-full"
      onClick={handlePayment}
      disabled={
        createPayment.isPending ||
        verifyPayment.isPending
      }
    >

      {createPayment.isPending
        ? "Creating Order..."
        : verifyPayment.isPending
        ? "Verifying..."
        : "Pay Now"}

    </Button>

  );

}
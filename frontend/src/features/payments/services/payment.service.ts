import api from "@/services/api";

export async function createPayment(
  bookingId: string
) {

  const { data } = await api.post(
    "/payments/create",
    {
      booking_id: bookingId,
    }
  );

  return data;

}

export async function verifyPayment(
  payload: {

    razorpay_order_id: string;

    razorpay_payment_id: string;

    razorpay_signature: string;

  }
) {

  const { data } = await api.post(
    "/payments/verify",
    payload
  );

  return data;

}

export async function getPaymentHistory() {

  const { data } = await api.get(
    "/payments/user/history"
  );

  return data;

}

export async function getPaymentAnalytics() {

  const { data } = await api.get(
    "/payments/analytics"
  );

  return data;

}

export async function getAllPayments() {

  const { data } = await api.get(
    "/payments"
  );

  return data;

}
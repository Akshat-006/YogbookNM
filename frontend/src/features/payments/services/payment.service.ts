import api from "@/services/api";

interface CreatePaymentPayload {
  booking_id: string;
}

export async function createPayment(payload: string | CreatePaymentPayload) {
  const body =
    typeof payload === "string" ? { booking_id: payload } : payload;

  const { data } = await api.post(
    "/payments/create",
    body
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
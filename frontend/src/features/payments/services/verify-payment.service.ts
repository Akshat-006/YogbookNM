import api from "@/services/api";

export interface VerifyPaymentPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export async function verifyPayment(
  payload: VerifyPaymentPayload
) {
  const { data } = await api.post(
    "/payments/verify",
    payload
  );

  return data;
}
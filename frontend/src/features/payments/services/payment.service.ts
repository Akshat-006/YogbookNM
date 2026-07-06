import api from "@/services/api";
import {
  CreatePaymentPayload,
  RazorpayOrder,
} from "../types/payment.types";

export async function createPayment(
  payload: CreatePaymentPayload
): Promise<RazorpayOrder> {

  const { data } = await api.post(
    "/payments/create",
    payload
  );

  return data;
}
export interface CreatePaymentPayload {
  booking_id: string;
}

export interface RazorpayOrder {
  order_id: string;
  amount: number;
  currency: string;
}
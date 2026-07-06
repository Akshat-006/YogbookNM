export interface Payment {
  _id: string;

  booking_id: string;

  class_id: string;

  user_name: string;

  user_email: string;

  amount: number;

  currency: string;

  status: "pending" | "paid" | "failed";

  provider: string;

  razorpay_order_id: string;

  razorpay_payment_id?: string;

  created_at: string;
}

export interface CreatePaymentResponse {

  payment_id: string;

  order_id: string;

  amount: number;

  currency: string;

  status: string;

  success: boolean;

}

export interface PaymentAnalytics {

  total_payments: number;

  paid: number;

  pending: number;

  failed: number;

  revenue: number;

}
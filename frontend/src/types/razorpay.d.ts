export {};

declare global {
  interface RazorpayOptions {
    key: string | undefined;
    amount: number;
    currency: string;
    order_id: string;
    name: string;
    description: string;
    timeout: number;
    handler: (response: RazorpayResponse) => void;
    modal: {
      ondismiss: () => void;
    };
    prefill: {
      name: string;
      email: string;
      contact: string;
    };
    theme: {
      color: string;
    };
  }

  interface RazorpayResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }

  interface RazorpayInstance {
    open: () => void;
  }

  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}
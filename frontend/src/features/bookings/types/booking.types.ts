export interface CreateBookingPayload {
  class_id: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface BookingResponse {
  success: boolean;
  booking_id: string;
  booking: {
    _id: string;
    class_id: string;
    name: string;
    email: string;
    phone: string;
    amount: number;
    payment_status: string;
    booking_status: string;
  };
}
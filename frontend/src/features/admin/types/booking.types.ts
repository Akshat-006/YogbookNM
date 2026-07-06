export interface AdminBooking {

  _id: string;

  user_name: string;

  user_email: string;

  class_title: string;

  instructor_name: string;

  booking_date: string;

  amount: number;

  payment_status:
    | "pending"
    | "paid"
    | "failed";

  booking_status:
    | "booked"
    | "cancelled"
    | "completed";

}
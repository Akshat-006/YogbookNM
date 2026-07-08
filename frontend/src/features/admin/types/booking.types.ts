export interface AdminBooking {

  _id: string;

  user_name: string;

  user_email: string;

  class_title: string;

  instructor_name: string;

  booking_date: string;

  schedule_datetime?: string;

  amount: number;

  payment_status:
    | "pending"
    | "paid"
    | "failed";

  booking_status:
    | "booked"
    | "cancelled"
    | "completed";

  meet_link?: string;

}
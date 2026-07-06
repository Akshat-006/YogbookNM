export interface DashboardStats {
  total_classes: number;
  total_users: number;
  total_bookings: number;
  total_appointments: number;
  total_payments: number;
  total_revenue: number;
  monthly_revenue?: Record<string, number>;

  recent_bookings: RecentBooking[];
  recent_appointments: RecentAppointment[];
}

export interface RecentBooking {
  _id: string;
  name: string;
  class_name: string;
  booking_status: string;
  payment_status: string;
}

export interface RecentAppointment {
  _id: string;
  name: string;
  appointment_datetime: string;
  appointment_status: string;
}
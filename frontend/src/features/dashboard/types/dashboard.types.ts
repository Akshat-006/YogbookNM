export interface UserProfile {
  email: string;
}

export interface DashboardStatistics {
  total_bookings: number;
  total_appointments: number;
  completed_payments: number;
}

export interface ClassBooking {
  _id: string;
  class_title: string;
  instructor_name: string;
  schedule_datetime: string;
  booking_status: string;
  payment_status: string;
  meet_link?: string;
}

export interface Appointment {
  _id: string;
  appointment_datetime: string;
  appointment_status: string;
  meet_link?: string;
}

export interface Payment {
  _id: string;
  amount: number;
  status: string;
  created_at: string;
}

export interface DashboardResponse {
  profile: UserProfile;
  statistics: DashboardStatistics;
  bookings: ClassBooking[];
  appointments: Appointment[];
  payments: Payment[];
  upcoming_classes: ClassBooking[];
  upcoming_appointments: Appointment[];
  recent_payments: Payment[];
}
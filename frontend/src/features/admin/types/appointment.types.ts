export interface AdminAppointment {
  _id: string;

  name: string;

  email: string;

  phone: string;

  appointment_datetime: string;

  notes?: string;

  payment_status: string;

  appointment_status: string;

  meet_link?: string;

  created_at: string;
}
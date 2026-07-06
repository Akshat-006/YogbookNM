export interface Appointment {
  _id: string;

  name: string;

  email: string;

  phone: string;

  appointment_datetime: string;

  appointment_status: string;

  payment_status: string;

  meet_link?: string;

  notes?: string;
}

export interface CreateAppointmentPayload {
  name: string;

  email: string;

  phone: string;

  appointment_datetime: string;

  notes?: string;
}

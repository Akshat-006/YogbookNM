export interface CreateBookingRequest {
  class_id: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}
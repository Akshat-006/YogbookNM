import api from "@/services/api";

import { CreateBookingPayload, BookingResponse } from "../types/booking.types";

export async function createBooking(
  payload: CreateBookingPayload,
): Promise<BookingResponse> {
  const { data } = await api.post("/class-bookings", payload);

  return data;
}

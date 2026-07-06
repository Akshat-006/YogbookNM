import api from "@/services/api";
import { CreateBookingRequest } from "../types/booking.types";

export async function createBooking(
  payload: CreateBookingRequest
) {
  const { data } = await api.post(
    "/class-bookings",
    payload
  );

  return data;
}
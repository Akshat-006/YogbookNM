import api from "@/services/api";

import { AdminBooking } from "../types/booking.types";

export async function getBookings() {

  const { data } =
    await api.get<AdminBooking[]>(
      "/bookings"
    );

  return data;

}

export async function updateBooking(

  id: string,

  payload: Partial<AdminBooking>

) {

  const { data } =
    await api.put(
      `/bookings/${id}`,
      payload
    );

  return data;

}

export async function deleteBooking(
  id: string
) {

  const { data } =
    await api.delete(
      `/bookings/${id}`
    );

  return data;

}
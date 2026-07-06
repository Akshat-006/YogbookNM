import api from "@/services/api";
import {
  Appointment,
  CreateAppointmentPayload,
} from "../types/appointment.types";

export async function getAvailableSlots(date: string) {
  const { data } = await api.get(
    `/appointments/availability?date=${date}`
  );

  return data;
}

export async function createAppointment(
  payload: CreateAppointmentPayload
): Promise<Appointment> {
  const { data } = await api.post(
    "/appointments",
    payload
  );

  return data;
}
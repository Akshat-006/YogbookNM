import api from "@/services/api";

import { AdminAppointment } from "../types/appointment.types";

export async function getAppointments() {
  const { data } = await api.get<AdminAppointment[]>(
    "/appointments"
  );

  return data;
}

export async function updateAppointment(
  id: string,
  payload: Partial<AdminAppointment>
) {
  const { data } = await api.put(
    `/appointments/${id}`,
    payload
  );

  return data;
}

export async function deleteAppointment(
  id: string
) {
  const { data } = await api.delete(
    `/appointments/${id}`
  );

  return data;
}
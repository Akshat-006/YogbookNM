import { useMutation } from "@tanstack/react-query";
import { createAppointment } from "../services/appointment.service";

export function useCreateAppointment() {
  return useMutation({
    mutationFn: createAppointment,
  });
}
import { useQuery } from "@tanstack/react-query";
import { getAvailableSlots } from "../services/appointment.service";

export function useAvailableSlots(date: string) {
  return useQuery({
    queryKey: ["appointment-slots", date],
    queryFn: () => getAvailableSlots(date),
    enabled: !!date,
  });
}
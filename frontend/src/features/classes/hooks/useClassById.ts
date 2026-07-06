import { useQuery } from "@tanstack/react-query";
import { getClassById } from "../services/class-details.service";

export function useClassById(id: string) {
  return useQuery({
    queryKey: ["class", id],
    queryFn: () => getClassById(id),
    enabled: !!id,
  });
}
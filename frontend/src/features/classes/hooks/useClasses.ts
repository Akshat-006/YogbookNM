import { useQuery } from "@tanstack/react-query";
import { getClasses } from "../services/classes.service";

export function useClasses() {
  return useQuery({
    queryKey: ["classes"],
    queryFn: getClasses,
    staleTime: 1000 * 60 * 5,
  });
}
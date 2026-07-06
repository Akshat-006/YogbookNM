import { useQuery } from "@tanstack/react-query";
import { getCMSContent } from "../services/cms.service";

export function useCMS() {
  return useQuery({
    queryKey: ["admin-cms"],
    queryFn: getCMSContent,
  });
}

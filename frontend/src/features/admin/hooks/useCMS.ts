import { useQuery } from "@tanstack/react-query";
import { getCMSContent, getCMSContentByKey } from "../services/cms.service";

export function useCMS() {
  return useQuery({
    queryKey: ["admin-cms"],
    queryFn: getCMSContent,
  });
}

export function useCMSContentByKey(key: string) {
  return useQuery({
    queryKey: ["cms-content", key],
    queryFn: () => getCMSContentByKey(key),
    enabled: Boolean(key),
    retry: false,
  });
}

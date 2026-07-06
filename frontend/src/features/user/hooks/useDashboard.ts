import { useQuery } from "@tanstack/react-query";

import { getDashboard } from "../services/user.service";

export function useDashboard(email?: string) {
  const resolvedEmail = email ?? (typeof window !== "undefined" ? window.localStorage.getItem("email") ?? "" : "");

  return useQuery({
    queryKey: ["dashboard", resolvedEmail],
    queryFn: () => getDashboard(resolvedEmail),
    enabled: !!resolvedEmail,
    staleTime: 1000 * 60 * 5,
  });
}
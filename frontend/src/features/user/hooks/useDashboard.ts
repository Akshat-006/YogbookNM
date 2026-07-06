import { useQuery } from "@tanstack/react-query";

import { getDashboard } from "../services/user.service";

export function useDashboard(email: string) {
  return useQuery({
    queryKey: ["dashboard", email],

    queryFn: () => getDashboard(email),

    enabled: !!email,

    staleTime: 1000 * 60 * 5,
  });
}
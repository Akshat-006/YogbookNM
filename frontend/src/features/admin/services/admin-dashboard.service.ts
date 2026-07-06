import api from "@/services/api";

import { DashboardStats } from "../types/admin.types";

export async function getDashboardStats() {
  const token = localStorage.getItem("token");

  const { data } =
    await api.get<DashboardStats>(
      "/dashboard",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return data;
}
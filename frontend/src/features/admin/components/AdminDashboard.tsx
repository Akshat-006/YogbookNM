"use client";

import { StatsCards } from "./StatsCards";
import { RecentBookings } from "./RecentBookings";
import { RecentAppointments } from "./RecentAppointments";
import { RevenueChart } from "./RevenueChart";

import { useAdminDashboard } from "../hooks/useAdminDashboard";

export function AdminDashboard() {
  const { data, isLoading, isError } =
    useAdminDashboard();

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        Loading Dashboard...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load dashboard.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <StatsCards stats={data} />

      <div className="grid gap-8 lg:grid-cols-2">

        <RecentBookings
          bookings={
            data.recent_bookings ?? []
          }
        />

        <RecentAppointments
          appointments={
            data.recent_appointments ?? []
          }
        />

      </div>

      <RevenueChart
        revenue={data.total_revenue}
      />

    </div>
  );
}
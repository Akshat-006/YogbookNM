"use client";

import { StatsCards } from "./StatsCards";
import { RecentBookings } from "./RecentBookings";
import { RecentAppointments } from "./RecentAppoinntments";
import { RevenueChart } from "./RevenueChart";

import { useAdminDashboard } from "../hooks/useAdminDashboard";

export function AdminDashboard() {
  const { data, isLoading, isError } =
    useAdminDashboard();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-2xl bg-muted/60"
            />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-64 animate-pulse rounded-2xl bg-muted/60" />
          <div className="h-64 animate-pulse rounded-2xl bg-muted/60" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/5 py-12 text-center">
        <p className="text-sm font-medium text-destructive">
          Failed to load dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <StatsCards stats={data} />

      <div className="grid gap-6 lg:grid-cols-2">

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
        monthlyRevenue={data.monthly_revenue}
      />

    </div>
  );
}
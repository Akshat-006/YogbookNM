"use client";

import { ProfileCard } from "./ProfileCard";
import { BookingTable } from "./BookingTable";
import { AppointmentTable } from "./AppointmentTable";
import { PaymentTable } from "./PaymentTable";

import { useDashboard } from "../hooks/useDashboard";

export function Dashboard() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        Loading dashboard...
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
    <div className="mx-auto flex max-w-7xl flex-col gap-8 py-10">
      <ProfileCard user={data.user} />

      <BookingTable
        bookings={data.bookings}
      />

      <AppointmentTable
        appointments={data.appointments}
      />

      <PaymentTable
        payments={data.payments}
      />
    </div>
  );
}
"use client";

import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";

export default function BookingsPage() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return <Container className="py-20">Loading your bookings...</Container>;
  }

  if (isError || !data) {
    return <Container className="py-20 text-red-500">Unable to load your bookings right now.</Container>;
  }

  return (
    <Container className="py-20">
      <div className="mb-8 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Dashboard</p>
          <h1 className="text-3xl font-semibold">My bookings</h1>
        </div>
        <Link href="/dashboard" className="text-sm font-medium text-primary">
          Back to overview
        </Link>
      </div>

      {data.bookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-8 text-center text-muted-foreground">
          You have not booked any classes yet.
        </div>
      ) : (
        <div className="space-y-4">
          {data.bookings.map((booking) => (
            <div key={booking._id} className="rounded-2xl border bg-background p-5 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{booking.class_title ?? "Yoga class"}</h2>
                  <p className="text-sm text-muted-foreground">Instructor: {booking.instructor_name ?? "TBA"}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {booking.schedule_datetime ? new Date(booking.schedule_datetime).toLocaleString() : "Schedule pending"}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">{booking.booking_status ?? "Pending"}</span>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">{booking.payment_status ?? "Pending"}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}

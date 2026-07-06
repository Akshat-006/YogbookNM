"use client";

import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";

export default function AppointmentsPage() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return <Container className="py-20">Loading your appointments...</Container>;
  }

  if (isError || !data) {
    return <Container className="py-20 text-red-500">Unable to load your appointments right now.</Container>;
  }

  return (
    <Container className="py-20">
      <div className="mb-8 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Dashboard</p>
          <h1 className="text-3xl font-semibold">My appointments</h1>
        </div>
        <Link href="/dashboard" className="text-sm font-medium text-primary">
          Back to overview
        </Link>
      </div>

      {data.appointments.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-8 text-center text-muted-foreground">
          You have no appointments scheduled yet.
        </div>
      ) : (
        <div className="space-y-4">
          {data.appointments.map((appointment) => (
            <div key={appointment._id} className="rounded-2xl border bg-background p-5 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Appointment request</h2>
                  <p className="text-sm text-muted-foreground">Status: {appointment.appointment_status ?? "Pending"}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {appointment.appointment_datetime ? new Date(appointment.appointment_datetime).toLocaleString() : "Timing pending"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}

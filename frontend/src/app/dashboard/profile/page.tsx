"use client";

import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";

export default function ProfilePage() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return <Container className="py-20">Loading your profile...</Container>;
  }

  if (isError || !data) {
    return <Container className="py-20 text-red-500">Unable to load your profile right now.</Container>;
  }

  return (
    <Container className="py-20">
      <div className="mb-8 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Dashboard</p>
          <h1 className="text-3xl font-semibold">Profile overview</h1>
        </div>
        <Link href="/dashboard" className="text-sm font-medium text-primary">
          Back to overview
        </Link>
      </div>

      <div className="rounded-3xl border bg-background p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Account</p>
        <h2 className="mt-2 text-2xl font-semibold">{data.profile.email}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">Bookings</p>
            <p className="mt-2 text-2xl font-semibold">{data.statistics.total_bookings}</p>
          </div>
          <div className="rounded-2xl bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">Appointments</p>
            <p className="mt-2 text-2xl font-semibold">{data.statistics.total_appointments}</p>
          </div>
          <div className="rounded-2xl bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">Completed payments</p>
            <p className="mt-2 text-2xl font-semibold">{data.statistics.completed_payments}</p>
          </div>
        </div>
      </div>
    </Container>
  );
}

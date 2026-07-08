"use client";

import Link from "next/link";
import { ArrowLeft, BookOpenCheck, CalendarDays, CreditCard, UserCircle2 } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";

export default function ProfilePage() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return (
      <Container className="py-24">
        <div className="h-64 animate-pulse rounded-3xl bg-muted/60" />
      </Container>
    );
  }

  if (isError || !data) {
    return (
      <Container className="py-24">
        <p className="text-center text-muted-foreground">Unable to load your profile right now.</p>
      </Container>
    );
  }

  const stats = [
    { label: "Bookings", value: data.statistics.total_bookings, icon: BookOpenCheck, color: "text-primary", bg: "bg-primary/10" },
    { label: "Appointments", value: data.statistics.total_appointments, icon: CalendarDays, color: "text-blue-600", bg: "bg-blue-500/10" },
    { label: "Payments", value: data.statistics.completed_payments, icon: CreditCard, color: "text-amber-600", bg: "bg-amber-500/10" },
  ];

  return (
    <Container className="py-20">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Dashboard</p>
          <h1 className="font-heading mt-1 text-3xl font-bold tracking-tight">My Profile</h1>
        </div>
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to overview
        </Link>
      </div>

      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
        {/* Avatar + email */}
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <UserCircle2 className="size-8 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Account</p>
            <h2 className="font-heading mt-1 text-xl font-bold">{data.profile.email}</h2>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-2xl border border-border bg-background/60 p-5">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
                  <Icon className={`size-5 ${stat.color}`} />
                </div>
                <h3 className="font-heading mt-4 text-3xl font-bold">{stat.value}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}

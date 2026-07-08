"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpenCheck,
  CalendarDays,
  CreditCard,
  ArrowRight,
} from "lucide-react";

import { useDashboard } from "../hooks/useDashboard";

import { Container } from "@/components/layout/Container";

import { UpcomingClasses } from "./UpcomingClasses";
import { UpcomingAppointments } from "./UpcomingAppointments";

const statCards = [
  {
    key: "total_bookings" as const,
    label: "Yoga Classes",
    icon: BookOpenCheck,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    key: "total_appointments" as const,
    label: "Appointments",
    icon: CalendarDays,
    color: "text-blue-600",
    bg: "bg-blue-500/10",
  },
  {
    key: "completed_payments" as const,
    label: "Payments",
    icon: CreditCard,
    color: "text-amber-600",
    bg: "bg-amber-500/10",
  },
];

export function Dashboard() {

    const {

        data,

        isLoading,

        isError

    } = useDashboard();

    if (isLoading) {

        return (

            <Container className="py-20">
              <div className="space-y-6">
                <div className="h-28 animate-pulse rounded-3xl bg-muted/60" />
                <div className="grid gap-5 md:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 animate-pulse rounded-2xl bg-muted/60" />
                  ))}
                </div>
              </div>
            </Container>

        );

    }

    if (isError) {
        return (
            <Container className="py-20">
                <p className="text-center text-muted-foreground">Unable to load dashboard.</p>
            </Container>
        );
    }

    return (

        <Container className="py-16">

          {/* Welcome banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 px-8 py-10 text-primary-foreground"
          >
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/8 blur-3xl" />
            <p className="text-sm font-medium opacity-80">Your wellness journey</p>
            <h1 className="font-heading mt-2 text-3xl font-bold sm:text-4xl">
              Welcome Back 👋
            </h1>
            <p className="mt-2 text-sm opacity-70">{data?.profile.email}</p>

            <div className="relative mt-6 flex flex-wrap gap-3">
              {[
                { label: "View Bookings", href: "/dashboard/bookings" },
                { label: "Appointments", href: "/dashboard/appointments" },
                { label: "Payment History", href: "/dashboard/payments" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
                >
                  {link.label}
                  <ArrowRight className="size-3" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Stat cards */}
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {statCards.map((card, i) => {
              const Icon = card.icon;
              const value = data?.statistics[card.key] ?? 0;
              return (
                <motion.div
                  key={card.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-premium"
                >
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.bg}`}>
                    <Icon className={`size-5 ${card.color}`} />
                  </div>
                  <h2 className="font-heading mt-5 text-3xl font-bold">{value}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{card.label}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Upcoming sections */}
          <div className="mt-10 grid gap-8 lg:grid-cols-2">

              <UpcomingClasses

                  classes={data?.upcoming_classes ?? []}

              />

              <UpcomingAppointments

                  appointments={
                      data?.upcoming_appointments ?? []
                  }/>

          </div>

        </Container>
    );
}
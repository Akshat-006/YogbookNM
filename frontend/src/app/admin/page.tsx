"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  CreditCard,
  LayoutTemplate,
  PlusCircle,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

import { AdminDashboard } from "@/features/admin/components/AdminDashboard";
import { useCMS } from "@/features/admin/hooks/useCMS";

const quickActions = [
  {
    title: "CRUD Classes",
    description: "Create, edit, and remove yoga classes from the public catalog.",
    href: "/admin/classes",
    icon: BookOpenCheck,
    primaryAction: "Manage classes",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Appointments",
    description: "Calendar view to review scheduled appointments and update status.",
    href: "/admin/appointments",
    icon: CalendarDays,
    primaryAction: "View calendar",
    color: "text-blue-600",
    bg: "bg-blue-500/10",
  },
  {
    title: "Payments",
    description: "Track payment history, verify bookings, and review revenue activity.",
    href: "/admin/payments",
    icon: CreditCard,
    primaryAction: "Review payments",
    color: "text-amber-600",
    bg: "bg-amber-500/10",
  },
  {
    title: "Website Content",
    description: "Edit hero, about, contact, and future site content from one CMS hub.",
    href: "/admin/cms",
    icon: LayoutTemplate,
    primaryAction: "Edit website",
    color: "text-violet-600",
    bg: "bg-violet-500/10",
  },
];

export default function AdminHomePage() {
  const { data = [], isLoading } = useCMS();

  return (
    <div className="space-y-8 p-6 lg:p-8">

      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 px-8 py-8 text-primary-foreground"
      >
        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-white/8 blur-3xl" />
        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium opacity-75">Admin workspace</p>
            <h1 className="font-heading mt-1 text-2xl font-bold sm:text-3xl">
              Operations Overview
            </h1>
            <p className="mt-2 max-w-lg text-sm opacity-70">
              Manage classes, appointments, payments, and the public website content.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/classes?create=1"
              className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
            >
              <PlusCircle className="size-4" />
              Create class
            </Link>
            <Link
              href="/admin/cms"
              className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
            >
              <Sparkles className="size-4" />
              Edit website
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Quick actions */}
      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          Quick Actions
        </p>
        <div className="grid gap-5 xl:grid-cols-4">
          {quickActions.map((action, i) => {
            const Icon = action.icon;

            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.45 }}
                whileHover={{ y: -4 }}
              >
                <Link
                  href={action.href}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-premium"
                >
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${action.bg}`}>
                    <Icon className={`size-5 ${action.color}`} />
                  </div>
                  <h2 className="font-heading mt-5 text-base font-bold">{action.title}</h2>
                  <p className="mt-2 text-xs leading-[1.7] text-muted-foreground">{action.description}</p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                    {action.primaryAction}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CMS blocks preview */}
      <div>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Website Content
            </p>
            <h2 className="font-heading mt-1 text-lg font-bold">CMS blocks on the public site</h2>
          </div>
          <Link
            href="/admin/cms"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold transition hover:border-primary/40 hover:bg-muted"
          >
            Manage CMS content
          </Link>
        </div>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 animate-pulse rounded-2xl bg-muted/60" />
            ))}
          </div>
        ) : data.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {data.slice(0, 6).map((item) => (
              <div
                key={item._id}
                className="rounded-2xl border border-border bg-card p-5 transition hover:shadow-sm"
              >
                <span className="inline-flex rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
                  {item.key}
                </span>
                <h3 className="font-heading mt-3 text-sm font-bold">{item.title || "Untitled block"}</h3>
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {item.subtitle || item.description || "Editable via CMS"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No CMS content has been created yet.</p>
        )}
      </div>

      {/* Stats + charts */}
      <div>
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          Analytics
        </p>
        <AdminDashboard />
      </div>

    </div>
  );
}

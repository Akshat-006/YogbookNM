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

import { AdminDashboard } from "@/features/admin/components/AdminDashboard";
import { useCMS } from "@/features/admin/hooks/useCMS";

const quickActions = [
  {
    title: "CRUD Classes",
    description: "Create, edit, and remove yoga classes from the public catalog.",
    href: "/admin/classes",
    icon: BookOpenCheck,
    primaryAction: "Manage classes",
  },
  {
    title: "Appointments",
    description: "Open the calendar view to review scheduled appointments and update status.",
    href: "/admin/appointments",
    icon: CalendarDays,
    primaryAction: "View calendar",
  },
  {
    title: "Payments",
    description: "Track payment history, verify bookings, and review revenue activity.",
    href: "/admin/payments",
    icon: CreditCard,
    primaryAction: "Review payments",
  },
  {
    title: "Website Content",
    description: "Edit hero, about, contact, and future site content from one CMS hub.",
    href: "/admin/cms",
    icon: LayoutTemplate,
    primaryAction: "Edit website",
  },
];

export default function AdminHomePage() {
  const { data = [], isLoading } = useCMS();

  return (
    <div className="space-y-8 p-8">
      <div className="rounded-3xl border bg-background p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Admin workspace</p>
            <h1 className="text-3xl font-semibold">Operations overview</h1>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Manage classes, appointments, payments, and the public website content from one dashboard.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/classes?create=1"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition hover:bg-muted"
            >
              <PlusCircle className="size-4" />
              Create class
            </Link>
            <Link
              href="/admin/cms"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition hover:bg-muted"
            >
              <Sparkles className="size-4" />
              Edit website content
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-4">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group rounded-3xl border bg-background p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="size-6" />
              </div>
              <h2 className="mt-5 text-xl font-semibold">{action.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{action.description}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                {action.primaryAction}
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="rounded-3xl border bg-background p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Current website content</p>
            <h2 className="text-2xl font-semibold">CMS blocks on the public site</h2>
          </div>
          <Link href="/admin/cms" className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition hover:bg-muted">
            Manage CMS content
          </Link>
        </div>

        {isLoading ? (
          <p className="mt-6 text-sm text-muted-foreground">Loading content blocks...</p>
        ) : data.length ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {data.slice(0, 6).map((item) => (
              <div key={item._id} className="rounded-2xl border bg-muted/30 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{item.key}</p>
                <h3 className="mt-2 font-semibold">{item.title || "Untitled block"}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.subtitle || item.description || "Editable via CMS"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-muted-foreground">No CMS content has been created yet.</p>
        )}
      </div>

      <AdminDashboard />
    </div>
  );
}

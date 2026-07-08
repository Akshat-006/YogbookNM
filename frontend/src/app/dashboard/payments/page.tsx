"use client";

import Link from "next/link";
import { ArrowLeft, CreditCard, CheckCircle2, Clock, XCircle } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";

function paymentPill(status: string) {
  if (status === "paid") return "pill-success";
  if (status === "pending") return "pill-warning";
  if (status === "failed") return "pill-danger";
  return "pill-neutral";
}

function statusIcon(status: string) {
  if (status === "paid") return <CheckCircle2 className="size-5 text-emerald-600" />;
  if (status === "pending") return <Clock className="size-5 text-amber-600" />;
  return <XCircle className="size-5 text-red-500" />;
}

export default function PaymentsPage() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return (
      <Container className="py-24">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-muted/60" />
          ))}
        </div>
      </Container>
    );
  }

  if (isError || !data) {
    return (
      <Container className="py-24">
        <p className="text-center text-muted-foreground">Unable to load payment history right now.</p>
      </Container>
    );
  }

  return (
    <Container className="py-20">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Dashboard</p>
          <h1 className="font-heading mt-1 text-3xl font-bold tracking-tight">Payment History</h1>
        </div>
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to overview
        </Link>
      </div>

      {data.payments.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <CreditCard className="mx-auto size-10 text-muted-foreground/40" />
          <p className="mt-4 text-sm text-muted-foreground">You have no payment records yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.payments.map((payment) => (
            <div
              key={payment._id}
              className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-premium"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted/60">
                  {statusIcon(payment.status ?? "")}
                </div>
                <div>
                  <h2 className="font-heading text-lg font-bold">₹{payment.amount ?? 0}</h2>
                  <p className="text-xs text-muted-foreground">
                    {payment.created_at
                      ? new Date(payment.created_at).toLocaleString("en-IN")
                      : "Date unavailable"}
                  </p>
                </div>
              </div>

              <span className={paymentPill(payment.status ?? "")}>
                {payment.status ?? "Pending"}
              </span>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}

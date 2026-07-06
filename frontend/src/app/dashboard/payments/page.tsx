"use client";

import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";

export default function PaymentsPage() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return <Container className="py-20">Loading your payments...</Container>;
  }

  if (isError || !data) {
    return <Container className="py-20 text-red-500">Unable to load your payment history right now.</Container>;
  }

  return (
    <Container className="py-20">
      <div className="mb-8 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Dashboard</p>
          <h1 className="text-3xl font-semibold">Payment history</h1>
        </div>
        <Link href="/dashboard" className="text-sm font-medium text-primary">
          Back to overview
        </Link>
      </div>

      {data.payments.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-8 text-center text-muted-foreground">
          You have no payment records yet.
        </div>
      ) : (
        <div className="space-y-4">
          {data.payments.map((payment) => (
            <div key={payment._id} className="rounded-2xl border bg-background p-5 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">₹{payment.amount ?? 0}</h2>
                  <p className="text-sm text-muted-foreground">{payment.status ?? "Pending"}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {payment.created_at ? new Date(payment.created_at).toLocaleString() : "Date unavailable"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}

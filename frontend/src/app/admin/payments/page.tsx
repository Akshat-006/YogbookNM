"use client";

import { useEffect, useState } from "react";

import { Container } from "@/components/layout/Container";
import { getAllPayments, getPaymentAnalytics } from "@/features/payments/services/payment.service";

type PaymentRecord = {
  _id: string;
  user_email?: string;
  status?: string;
  amount?: number;
  created_at?: string;
};

type PaymentAnalytics = {
  total_payments?: number;
  successful_payments?: number;
  total_revenue?: number;
};

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [analytics, setAnalytics] = useState<PaymentAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [paymentsResponse, analyticsResponse] = await Promise.all([
          getAllPayments(),
          getPaymentAnalytics(),
        ]);

        setPayments(Array.isArray(paymentsResponse) ? paymentsResponse : []);
        setAnalytics(analyticsResponse);
      } catch {
        setError("Unable to load payment records right now.");
      } finally {
        setLoading(false);
      }
    }

    void loadData();
  }, []);

  if (loading) {
    return <Container className="py-20">Loading payments...</Container>;
  }

  if (error) {
    return <Container className="py-20 text-red-500">{error}</Container>;
  }

  return (
    <Container className="py-20">
      <div className="mb-8">
        <p className="text-sm font-medium text-muted-foreground">Admin</p>
        <h1 className="text-3xl font-semibold">Payments</h1>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-background p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Total payments</p>
          <p className="mt-2 text-2xl font-semibold">{analytics?.total_payments ?? payments.length}</p>
        </div>
        <div className="rounded-2xl border bg-background p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Successful payments</p>
          <p className="mt-2 text-2xl font-semibold">{analytics?.successful_payments ?? 0}</p>
        </div>
        <div className="rounded-2xl border bg-background p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Revenue</p>
          <p className="mt-2 text-2xl font-semibold">₹{analytics?.total_revenue ?? 0}</p>
        </div>
      </div>

      <div className="rounded-2xl border bg-background shadow-sm">
        <div className="border-b p-5">
          <h2 className="text-lg font-semibold">Recent transactions</h2>
        </div>
        <div className="divide-y">
          {payments.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No payment records found.</div>
          ) : (
            payments.map((payment) => (
              <div key={payment._id} className="flex flex-col gap-2 p-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium">{payment.user_email ?? "Unknown user"}</p>
                  <p className="text-sm text-muted-foreground">{payment.status ?? "Pending"}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  ₹{payment.amount ?? 0} • {payment.created_at ? new Date(payment.created_at).toLocaleString() : "Date unavailable"}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Container>
  );
}

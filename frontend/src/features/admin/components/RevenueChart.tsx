"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  revenue: number;
  monthlyRevenue?: Record<string, number>;
}

export function RevenueChart({
  revenue,
  monthlyRevenue,
}: Props) {
  const entries = Object.entries(monthlyRevenue ?? {}).slice(-6);
  const maxValue = Math.max(...entries.map(([, value]) => value), 1);

  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="rounded-2xl border border-dashed p-6 text-center">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <h2 className="mt-3 text-5xl font-bold">₹{revenue}</h2>
        </div>

        {entries.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-6">
            {entries.map(([label, value]) => (
              <div key={label} className="rounded-2xl border p-3 text-center">
                <div className="mb-2 text-xs text-muted-foreground">{label}</div>
                <div
                  className="mx-auto w-full rounded-t-xl bg-teal-600"
                  style={{ height: `${Math.max(24, (value / maxValue) * 100)}px` }}
                />
                <div className="mt-2 text-sm font-semibold">₹{value}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Revenue analytics will appear once payment data is available.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
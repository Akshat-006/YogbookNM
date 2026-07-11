"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

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
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="border-b border-border px-6 py-5">
        <div className="flex items-center justify-between">
          <CardTitle className="font-heading text-base font-bold">
            Revenue Overview
          </CardTitle>
          <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <TrendingUp className="size-3.5" />
            Monthly trend
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Total revenue callout */}
        <div className="flex items-center justify-between rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/8 to-primary/4 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Total Revenue
            </p>
            <h2 className="font-heading mt-2 text-4xl font-bold tracking-tight">
              ₹{(Number(revenue) || 0).toLocaleString("en-IN")}
            </h2>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15">
            <TrendingUp className="size-6 text-primary" />
          </div>
        </div>

        {/* Bar chart */}
        {entries.length > 0 ? (
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Last 6 months
            </p>
            <div className="flex items-end gap-2">
              {entries.map(([label, value]) => {
                const heightPct = Math.max(12, (value / maxValue) * 100);
                return (
                  <div
                    key={label}
                    className="group flex flex-1 flex-col items-center gap-2"
                  >
                    <span className="text-xs font-bold text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                      ₹{value}
                    </span>
                    <div className="w-full overflow-hidden rounded-t-lg">
                      <div
                        className="w-full rounded-t-lg bg-gradient-to-t from-primary to-primary/60 transition-all duration-500 group-hover:from-primary group-hover:to-primary/80"
                        style={{ height: `${heightPct}px` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">{label}</span>
                  </div>
                );
              })}
            </div>
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
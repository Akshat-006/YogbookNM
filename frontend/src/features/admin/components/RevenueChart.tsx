"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  revenue: number;
}

export function RevenueChart({
  revenue,
}: Props) {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>
          Revenue Overview
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex h-52 items-center justify-center rounded-2xl border border-dashed">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Total Revenue
            </p>

            <h2 className="mt-3 text-5xl font-bold">
              ₹{revenue}
            </h2>

            <p className="mt-3 text-sm text-muted-foreground">
              Revenue analytics chart will be integrated here.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
"use client";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
  stats: {
    total_classes: number;
    total_users: number;
    total_bookings: number;
    total_appointments: number;
    total_payments: number;
    total_revenue: number;
  };
}

export function StatsCards({
  stats,
}: Props) {
  const cards = [
    {
      title: "Classes",
      value: stats.total_classes,
    },
    {
      title: "Users",
      value: stats.total_users,
    },
    {
      title: "Bookings",
      value: stats.total_bookings,
    },
    {
      title: "Appointments",
      value: stats.total_appointments,
    },
    {
      title: "Payments",
      value: stats.total_payments,
    },
    {
      title: "Revenue",
      value: `₹${stats.total_revenue}`,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="rounded-3xl"
        >
          <CardContent className="p-8">
            <p className="text-sm text-muted-foreground">
              {card.title}
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              {card.value}
            </h2>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
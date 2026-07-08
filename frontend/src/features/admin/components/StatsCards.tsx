"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpenCheck,
  Users,
  CalendarDays,
  CreditCard,
  TrendingUp,
  BookMarked,
} from "lucide-react";
import { motion } from "framer-motion";

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

const cardConfig = [
  {
    key: "total_classes" as const,
    title: "Classes",
    icon: BookOpenCheck,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-l-primary",
  },
  {
    key: "total_users" as const,
    title: "Users",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-500/10",
    border: "border-l-blue-500",
  },
  {
    key: "total_bookings" as const,
    title: "Bookings",
    icon: BookMarked,
    color: "text-violet-600",
    bg: "bg-violet-500/10",
    border: "border-l-violet-500",
  },
  {
    key: "total_appointments" as const,
    title: "Appointments",
    icon: CalendarDays,
    color: "text-amber-600",
    bg: "bg-amber-500/10",
    border: "border-l-amber-500",
  },
  {
    key: "total_payments" as const,
    title: "Payments",
    icon: CreditCard,
    color: "text-pink-600",
    bg: "bg-pink-500/10",
    border: "border-l-pink-500",
  },
  {
    key: "total_revenue" as const,
    title: "Revenue",
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
    border: "border-l-emerald-500",
    prefix: "₹",
  },
];

export function StatsCards({
  stats,
}: Props) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {cardConfig.map((card, i) => {
        const Icon = card.icon;
        const raw = stats[card.key];
        const value = card.prefix
          ? `${card.prefix}${Number(raw).toLocaleString()}`
          : raw;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.45 }}
            whileHover={{ y: -4 }}
          >
            <Card
              className={`rounded-2xl border-l-4 shadow-sm transition-shadow hover:shadow-premium ${card.border}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                      {card.title}
                    </p>
                    <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight">
                      {value}
                    </h2>
                  </div>
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.bg}`}
                  >
                    <Icon className={`size-5 ${card.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Booking {
  _id: string;
  name: string;
  class_name: string;
  booking_status: string;
  payment_status: string;
}

interface Props {
  bookings: Booking[];
}

function bookingPill(status: string) {
  if (status === "booked") return "pill-info";
  if (status === "completed") return "pill-success";
  if (status === "cancelled") return "pill-danger";
  return "pill-neutral";
}

function paymentPill(status: string) {
  if (status === "paid") return "pill-success";
  if (status === "pending") return "pill-warning";
  if (status === "failed") return "pill-danger";
  return "pill-neutral";
}

export function RecentBookings({
  bookings,
}: Props) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="border-b border-border px-6 py-5">
        <CardTitle className="font-heading text-base font-bold">
          Recent Bookings
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        {bookings.length === 0 ? (
          <p className="px-6 py-8 text-sm text-muted-foreground">
            No recent bookings found.
          </p>
        ) : (
          <div className="divide-y divide-border">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-muted/30"
              >
                <div>
                  <h3 className="text-sm font-semibold leading-tight">
                    {booking.class_name}
                  </h3>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {booking.name}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1.5">
                  <span className={bookingPill(booking.booking_status)}>
                    {booking.booking_status}
                  </span>

                  <span className={paymentPill(booking.payment_status)}>
                    {booking.payment_status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
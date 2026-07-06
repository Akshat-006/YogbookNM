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

export function RecentBookings({
  bookings,
}: Props) {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>
          Recent Bookings
        </CardTitle>
      </CardHeader>

      <CardContent>
        {bookings.length === 0 ? (
          <p className="text-muted-foreground">
            No recent bookings found.
          </p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="flex items-center justify-between rounded-xl border p-4"
              >
                <div>
                  <h3 className="font-semibold">
                    {booking.class_name}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {booking.name}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium">
                    {booking.booking_status}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {booking.payment_status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
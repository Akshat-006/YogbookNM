"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Booking {
  _id: string;
  class_name: string;
  instructor_name: string;
  schedule_datetime: string;
  booking_status: string;
  payment_status: string;
}

interface Props {
  bookings: Booking[];
}

export function BookingTable({
  bookings,
}: Props) {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>
          My Class Bookings
        </CardTitle>
      </CardHeader>

      <CardContent>
        {bookings.length === 0 ? (
          <p className="text-muted-foreground">
            You haven't booked any classes yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b">
                <tr>
                  <th className="py-3">Class</th>
                  <th>Instructor</th>
                  <th>Date</th>
                  <th>Payment</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b"
                  >
                    <td className="py-4 font-medium">
                      {booking.class_name}
                    </td>

                    <td>
                      {booking.instructor_name}
                    </td>

                    <td>
                      {new Date(
                        booking.schedule_datetime
                      ).toLocaleString("en-IN")}
                    </td>

                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          booking.payment_status === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.payment_status}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          booking.booking_status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {booking.booking_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
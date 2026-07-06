"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

interface Appointment {
  _id: string;
  appointment_datetime: string;
  appointment_status: string;
  meet_link?: string;
  notes?: string;
}

interface Props {
  appointments: Appointment[];
}

export function AppointmentTable({
  appointments,
}: Props) {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>
          My Appointments
        </CardTitle>
      </CardHeader>

      <CardContent>
        {appointments.length === 0 ? (
          <p className="text-muted-foreground">
            You haven't booked any appointments yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b">
                <tr>
                  <th className="py-3">Date & Time</th>
                  <th>Status</th>
                  <th>Meet</th>
                  <th>Notes</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((appointment) => (
                  <tr
                    key={appointment._id}
                    className="border-b"
                  >
                    <td className="py-4">
                      {new Date(
                        appointment.appointment_datetime
                      ).toLocaleString("en-IN")}
                    </td>

                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          appointment.appointment_status === "booked"
                            ? "bg-green-100 text-green-700"
                            : appointment.appointment_status === "completed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {appointment.appointment_status}
                      </span>
                    </td>

                    <td>
                      {appointment.meet_link ? (
                        <Button
                          asChild
                          size="sm"
                        >
                          <Link
                            href={appointment.meet_link}
                            target="_blank"
                          >
                            Join
                          </Link>
                        </Button>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td>
                      {appointment.notes || "-"}
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
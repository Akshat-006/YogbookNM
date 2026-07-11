"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDateTime } from "@/lib/formatTime";

interface Appointment {
  _id: string;
  name: string;
  appointment_datetime: string;
  appointment_status: string;
}

interface Props {
  appointments: Appointment[];
}

function statusPill(status: string) {
  if (status === "completed") return "pill-success";
  if (status === "booked") return "pill-info";
  if (status === "cancelled") return "pill-danger";
  return "pill-neutral";
}

export function RecentAppointments({
  appointments,
}: Props) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="border-b border-border px-6 py-5">
        <CardTitle className="font-heading text-base font-bold">
          Recent Appointments
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        {appointments.length === 0 ? (
          <p className="px-6 py-8 text-sm text-muted-foreground">
            No recent appointments found.
          </p>
        ) : (
          <div className="divide-y divide-border">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-muted/30"
              >
                <div>
                  <h3 className="text-sm font-semibold leading-tight">
                    {appointment.name}
                  </h3>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {formatDateTime(appointment.appointment_datetime)}
                  </p>
                </div>

                <span className={statusPill(appointment.appointment_status)}>
                  {appointment.appointment_status}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Appointment {
  _id: string;
  name: string;
  appointment_datetime: string;
  appointment_status: string;
}

interface Props {
  appointments: Appointment[];
}

export function RecentAppointments({
  appointments,
}: Props) {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>
          Recent Appointments
        </CardTitle>
      </CardHeader>

      <CardContent>
        {appointments.length === 0 ? (
          <p className="text-muted-foreground">
            No recent appointments found.
          </p>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="flex items-center justify-between rounded-xl border p-4"
              >
                <div>
                  <h3 className="font-semibold">
                    {appointment.name}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {new Date(
                      appointment.appointment_datetime
                    ).toLocaleString("en-IN")}
                  </p>
                </div>

                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm">
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
"use client";

import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, isSameDay } from "date-fns";

import { Button } from "@/components/ui/button";
import { DeleteClassDialog } from "@/features/admin/components/DeleteClassDialog";
import { UpdateAppointmentDialog } from "@/features/admin/components/UpdateAppointmentDialog";

import {
  useAppointments,
  useDeleteAppointment,
  useUpdateAppointment,
} from "@/features/admin/hooks/useAppointments";

import { AdminAppointment } from "@/features/admin/types/appointment.types";

export default function AdminAppointmentsPage() {
  const { data = [], isLoading } = useAppointments();
  const updateAppointment = useUpdateAppointment();
  const deleteAppointment = useDeleteAppointment();

  const [selectedAppointment, setSelectedAppointment] = useState<AdminAppointment | null>(null);
  const [statusOpen, setStatusOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const appointmentsByDay = useMemo(() => {
    return (data ?? []).filter((appointment) => {
      const appointmentDate = new Date(appointment.appointment_datetime);
      return isSameDay(appointmentDate, selectedDate);
    });
  }, [data, selectedDate]);

  const appointmentDates = useMemo(() => {
    const dates = new Set<string>();
    for (const appointment of data ?? []) {
      const appointmentDate = new Date(appointment.appointment_datetime);
      dates.add(format(appointmentDate, "yyyy-MM-dd"));
    }
    return dates;
  }, [data]);

  async function handleStatus(status: string) {
    if (!selectedAppointment) return;

    await updateAppointment.mutateAsync({
      id: selectedAppointment._id,
      payload: {
        appointment_status: status,
      },
    });

    setStatusOpen(false);
  }

  async function handleDelete() {
    if (!selectedAppointment) return;

    await deleteAppointment.mutateAsync(selectedAppointment._id);
    setDeleteOpen(false);
  }

  if (isLoading) {
    return <p className="p-10">Loading...</p>;
  }

  return (
    <div className="space-y-8 p-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Admin</p>
        <h1 className="text-3xl font-bold">Appointment Calendar</h1>
        <p className="text-sm text-muted-foreground">
          Review appointments by date, update their status, or remove them from the system.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border bg-background p-6 shadow-sm">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            modifiers={{
              hasAppointment: Array.from(appointmentDates).map((day) => new Date(`${day}T00:00:00`)),
            }}
            modifiersClassNames={{
              hasAppointment: "!bg-primary/10 !text-primary font-semibold",
            }}
            disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
          />
        </div>

        <div className="rounded-3xl border bg-background p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Selected day</p>
              <h2 className="text-xl font-semibold">{format(selectedDate, "EEEE, MMM d")}</h2>
            </div>
            <div className="rounded-full bg-muted px-3 py-1 text-sm font-medium">
              {appointmentsByDay.length} appointment{appointmentsByDay.length === 1 ? "" : "s"}
            </div>
          </div>

          {appointmentsByDay.length === 0 ? (
            <div className="rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
              No appointments are scheduled for this day.
            </div>
          ) : (
            <div className="space-y-4">
              {appointmentsByDay.map((appointment) => (
                <div key={appointment._id} className="rounded-2xl border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{appointment.name}</p>
                      <p className="text-sm text-muted-foreground">{appointment.email}</p>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <p>{format(new Date(appointment.appointment_datetime), "h:mm a")}</p>
                      <p>{appointment.appointment_status}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setStatusOpen(true);
                      }}
                    >
                      Update status
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setDeleteOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <UpdateAppointmentDialog
        open={statusOpen}
        onOpenChange={setStatusOpen}
        currentStatus={selectedAppointment?.appointment_status ?? "booked"}
        loading={updateAppointment.isPending}
        onSubmit={handleStatus}
      />

      <DeleteClassDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        loading={deleteAppointment.isPending}
        onDelete={handleDelete}
      />
    </div>
  );
}
"use client";

import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, isSameDay } from "date-fns";
import { Video, Clock, Mail, Phone, StickyNote } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DeleteClassDialog } from "@/features/admin/components/DeleteClassDialog";
import { UpdateAppointmentDialog } from "@/features/admin/components/UpdateAppointmentDialog";

import {
  useAppointments,
  useDeleteAppointment,
  useUpdateAppointment,
} from "@/features/admin/hooks/useAppointments";

import { AdminAppointment } from "@/features/admin/types/appointment.types";
import { toast } from "sonner";

function statusPill(status: string) {
  if (status === "completed") return "pill-success";
  if (status === "booked") return "pill-info";
  if (status === "cancelled") return "pill-danger";
  return "pill-neutral";
}

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
    try {
      await updateAppointment.mutateAsync({
        id: selectedAppointment._id,
        payload: { appointment_status: status },
      });
      setStatusOpen(false);
      toast.success("Appointment status updated successfully!");
    } catch {
      toast.error("Failed to update appointment status.");
    }
  }

  async function handleDelete() {
    if (!selectedAppointment) return;
    try {
      await deleteAppointment.mutateAsync(selectedAppointment._id);
      setDeleteOpen(false);
      toast.success("Appointment deleted successfully!");
    } catch {
      toast.error("Failed to delete appointment.");
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6 p-8">
        <div className="h-8 w-56 animate-pulse rounded-xl bg-muted/60" />
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="h-80 animate-pulse rounded-3xl bg-muted/60" />
          <div className="h-80 animate-pulse rounded-3xl bg-muted/60" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Admin</p>
        <h1 className="font-heading mt-1 text-3xl font-bold tracking-tight">Appointment Calendar</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Review appointments by date, update their status, or remove them.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Calendar */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            modifiers={{
              hasAppointment: Array.from(appointmentDates).map(
                (day) => new Date(`${day}T00:00:00`)
              ),
            }}
            modifiersClassNames={{
              hasAppointment: "!bg-primary/10 !text-primary font-semibold",
            }}
          />
        </div>

        {/* Day panel */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Selected day
              </p>
              <h2 className="font-heading mt-1 text-xl font-bold">
                {format(selectedDate, "EEEE, MMM d")}
              </h2>
            </div>
            <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              {appointmentsByDay.length}{" "}
              {appointmentsByDay.length === 1 ? "appointment" : "appointments"}
            </div>
          </div>

          {appointmentsByDay.length === 0 ? (
            <div className="rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">
              No appointments scheduled for this day.
            </div>
          ) : (
            <div className="space-y-4">
              {appointmentsByDay.map((appointment) => (
                <div
                  key={appointment._id}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-background/70 p-5 transition-all hover:shadow-sm"
                >
                  {/* Left accent */}
                  <div className="absolute left-0 top-5 bottom-5 w-1 rounded-full bg-blue-500" />

                  <div className="pl-4">
                    {/* Name + status pill + time */}
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="font-heading font-bold leading-tight">{appointment.name}</p>
                        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="size-3.5 text-blue-500" />
                          {format(new Date(appointment.appointment_datetime), "h:mm a")}
                        </p>
                      </div>
                      <span className={statusPill(appointment.appointment_status)}>
                        {appointment.appointment_status}
                      </span>
                    </div>

                    {/* Contact info */}
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Mail className="size-3.5" />
                        {appointment.email}
                      </span>
                      {appointment.phone && (
                        <span className="flex items-center gap-1.5">
                          <Phone className="size-3.5" />
                          {appointment.phone}
                        </span>
                      )}
                    </div>

                    {/* Notes */}
                    {appointment.notes && (
                      <div className="mt-3 flex items-start gap-1.5 rounded-xl bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                        <StickyNote className="mt-px size-3.5 shrink-0" />
                        <span className="leading-relaxed">{appointment.notes}</span>
                      </div>
                    )}

                    {/* Meet link */}
                    {appointment.meet_link && (
                      <a
                        href={appointment.meet_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 px-3 py-1.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-500 hover:text-white"
                      >
                        <Video className="size-3.5" />
                        Join Meeting
                      </a>
                    )}

                    {/* Actions */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        className="h-8 rounded-full bg-primary/8 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
                        variant="ghost"
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setStatusOpen(true);
                        }}
                      >
                        Update status
                      </Button>
                      <Button
                        size="sm"
                        className="h-8 rounded-full bg-destructive/8 text-xs font-semibold text-destructive hover:bg-destructive hover:text-white"
                        variant="ghost"
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setDeleteOpen(true);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
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
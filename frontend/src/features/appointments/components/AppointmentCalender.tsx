"use client";

import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { CalendarDays, Clock3, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

import { useAvailableSlots } from "../hooks/useAvailableSlots";
import dynamic from "next/dynamic";

const AppointmentDialog = dynamic(
  () => import("./AppointmentDialog").then((mod) => mod.AppointmentDialog),
  { ssr: false }
);

interface SlotItem {
  time: string;
  available: boolean;
}

export function AppointmentCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  });

  const formattedDate = useMemo(() => format(selectedDate, "yyyy-MM-dd"), [selectedDate]);
  const { data, isLoading, isError } = useAvailableSlots(formattedDate);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");

  const slots = (data?.slots ?? []) as SlotItem[];
  const selectedDayLabel = format(selectedDate, "EEEE, MMM d");
  const displayDate = data?.display_date ?? format(selectedDate, "dd-MM-yyyy");
  const hasAvailableSlots = slots.some((slot) => slot.available);

  return (
    <Container>
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="overflow-hidden rounded-[32px] border bg-gradient-to-br from-primary/10 via-background to-background p-8 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-3 py-1 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                Free 30-minute consultation
              </div>
              <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">Book your yoga consultation</h1>
              <p className="text-lg text-muted-foreground">
                Pick a day, choose a half-hour slot, and share your details. We’ll send a confirmation email with the appointment time and join link.
              </p>
            </div>
            <div className="rounded-2xl border bg-background/80 px-4 py-3 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Available hours</p>
              <p>09:00 AM to 06:00 PM</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border bg-background p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Pick a date</h2>
                <p className="text-sm text-muted-foreground">Choose the day you’d like to meet</p>
              </div>
            </div>
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
              className="mx-auto"
            />
          </div>

          <div className="rounded-3xl border bg-background p-6 shadow-sm">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Selected day</p>
                <h2 className="text-2xl font-semibold">{selectedDayLabel}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{displayDate} • 30-minute slots</p>
              </div>
              <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {slots.length} time slots
              </div>
            </div>

            {isLoading ? (
              <div className="rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                Loading available slots...
              </div>
            ) : isError ? (
              <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-sm text-destructive">
                We could not load consultation slots right now. Please try again in a moment.
              </div>
            ) : !slots.length || !hasAvailableSlots ? (
              <div className="rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                No open slots are available for this date. Please choose another day.
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {slots.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => {
                      if (!slot.available) return;
                      setSelectedSlot(slot.time);
                      setDialogOpen(true);
                    }}
                    disabled={!slot.available}
                    className={`rounded-2xl border p-4 text-left transition ${
                      slot.available
                        ? "border-primary/20 bg-background hover:border-primary hover:shadow-sm"
                        : "cursor-not-allowed border-muted-foreground/10 bg-muted/40"
                    } ${selectedSlot === slot.time ? "ring-2 ring-primary" : ""}`}
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Clock3 className="h-4 w-4" />
                      {slot.time}
                    </div>
                    <p className={`mt-2 text-sm ${slot.available ? "text-emerald-600" : "text-muted-foreground"}`}>
                      {slot.available ? "Available" : "Booked"}
                    </p>
                  </button>
                ))}
              </div>
            )}

            <div className="mt-6 rounded-2xl border bg-muted/30 p-4 text-sm text-muted-foreground">
              {selectedSlot ? (
                <p>
                  Selected slot: <span className="font-semibold text-foreground">{selectedSlot}</span>. Continue to book your consultation.
                </p>
              ) : (
                <p>Select any available card to open the booking form and confirm your consultation.</p>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">Each session lasts 30 minutes and includes a confirmation email.</p>
              <Button
                type="button"
                className="rounded-full bg-primary px-7 font-semibold text-primary-foreground shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg"
                onClick={() => {
                  if (!selectedSlot) return;
                  setDialogOpen(true);
                }}
                disabled={!selectedSlot}
              >
                Book selected slot
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AppointmentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        selectedDate={formattedDate}
        displayDate={displayDate}
        selectedTime={selectedSlot}
      />
    </Container>
  );
}


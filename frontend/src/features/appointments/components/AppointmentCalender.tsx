"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { useAvailableSlots } from "../hooks/useAvailableSlots";
import { SlotCard } from "./SlotCard";

import { Container } from "@/components/layout/Container";

import { AppointmentDialog } from "./AppointmentDialog";

export function AppointmentCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  
  const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  
  const { data, isLoading } = useAvailableSlots(formattedDate);
  
  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedSlot, setSelectedSlot] =
    useState("");

  return (
    <Container>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Book a Free Yoga Consultation</h1>

        <p className="mt-3 text-muted-foreground">
          Select a date to view available consultation slots.
        </p>
      </div>

      <div className="rounded-3xl border p-8">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={{
            before: new Date(
                new Date().setHours(0, 0, 0, 0)
            ),
        }}
        />
      </div>

      {/* Time Picker */}
      <div className="mt-10">
        <h3 className="mb-5 text-xl font-semibold">Available Time Slots</h3>

        {data?.display_date && (
            <p className="mt-2 text-sm text-muted-foreground">
                Selected Date: {data.display_date}
            </p>
        )}
        
        {isLoading ? (
          <p>Loading slots...</p>
        ) : data?.slots?.length === 0 ? (
        <p className="text-muted-foreground">
            No slots available for this date.
            </p>
            ) : (
        <div className="grid gap-4 md:grid-cols-3">
            {data?.slots?.map((slot: any) => (
                <SlotCard
                    key={slot.time}
                    time={slot.time}
                    available={slot.available}
                    onClick={() => {
                        setSelectedSlot(slot.time);
                        setDialogOpen(true);
                        }}
                        />
            ))}
        </div>)}
        
        </div>
        <AppointmentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        selectedDate={formattedDate}
        displayDate={data?.display_date ?? ""}
        selectedTime={selectedSlot}
      />
    </Container>
        
  );
}


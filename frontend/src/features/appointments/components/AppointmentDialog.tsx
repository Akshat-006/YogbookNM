"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSendOTP } from "@/features/otp/hooks/useSendOTP";
import { useVerifyOTP } from "@/features/otp/hooks/useVerifyOTP";
import { useCreateAppointment } from "../hooks/useCreateAppointment";

import {
  appointmentSchema,
  AppointmentFormData,
} from "../schemas/appointment.schema";

interface Props {
  open: boolean;
  onOpenChange: (value: boolean) => void;

  selectedDate: string;
  displayDate: string;
  selectedTime: string;
}

export function AppointmentDialog({
  open,
  onOpenChange,
  selectedDate,
  displayDate,
  selectedTime,
}: Props) {
  const [step, setStep] = useState(1);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const sendOTP = useSendOTP();
  const verifyOTP = useVerifyOTP();
  const appointment = useCreateAppointment();
  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });
  const [otp, setOtp] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Free Consultation</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          {displayDate} • {selectedTime}
        </p>

        {step === 1 && (
          <div className="space-y-4">
            <Input placeholder="Full Name" {...form.register("name")} />

            <Input placeholder="Email Address" {...form.register("email")} />

            <Button
              className="w-full"
              type="button"
              disabled={sendOTP.isPending}
              onClick={async () => {
                const valid = await form.trigger(["name", "email"]);

                if (!valid) return;

                try {
                  setStatusMessage(null);
                  await sendOTP.mutateAsync(form.getValues("email"));
                  setStep(2);
                } catch (error: unknown) {
                  setStatusMessage(
                    (error as any)?.response?.data?.detail ||
                    "Unable to send OTP right now. Please try again."
                  );
                }
              }}
            >
              {sendOTP.isPending ? "Sending..." : "Send OTP"}
            </Button>
            {statusMessage && (
              <p className="text-sm text-destructive">{statusMessage}</p>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <Input
              placeholder="Enter OTP"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <Button
              className="w-full"
              type="button"
              disabled={verifyOTP.isPending}
              onClick={async () => {
                try {
                  setStatusMessage(null);
                  await verifyOTP.mutateAsync({
                    email: form.getValues("email"),
                    otp,
                  });

                  setStep(3);
                } catch (error: unknown) {
                  setStatusMessage(
                    (error as any)?.response?.data?.detail ||
                    "OTP verification failed. Please try again."
                  );
                }
              }}
            >
              {verifyOTP.isPending ? "Verifying..." : "Verify OTP"}
            </Button>
            {statusMessage && (
              <p className="text-sm text-destructive">{statusMessage}</p>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <Input placeholder="Phone Number" {...form.register("phone")} />

            <Textarea
              placeholder="Notes (Optional)"
              {...form.register("notes")}
            />

            <Button
              className="w-full"
              type="button"
              disabled={appointment.isPending}
              onClick={async () => {
                const valid = await form.trigger(["phone"]);

                if (!valid) return;

                try {
                  setStatusMessage(null);
                  await appointment.mutateAsync({
                    name: form.getValues("name"),
                    email: form.getValues("email"),
                    phone: form.getValues("phone"),
                    notes: form.getValues("notes"),
                    appointment_datetime: `${selectedDate}T${selectedTime}:00`,
                  });

                  form.reset();
                  setOtp("");
                  setStep(1);
                  onOpenChange(false);
                } catch {
                  setStatusMessage("Unable to book the appointment right now. Please try again.");
                }
              }}
            >
              {appointment.isPending ? "Booking..." : "Book Appointment"}
            </Button>
            {statusMessage && (
              <p className="text-sm text-destructive">{statusMessage}</p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

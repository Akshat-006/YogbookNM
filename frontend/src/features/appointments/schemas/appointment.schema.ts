import { z } from "zod";

export const appointmentSchema = z.object({
  name: z.string().min(2),

  email: z.string().email(),

  phone: z.string().min(10),

  notes: z.string().optional(),
});

export type AppointmentFormData =
  z.infer<typeof appointmentSchema>;
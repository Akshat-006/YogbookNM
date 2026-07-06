import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().min(10),
  notes: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
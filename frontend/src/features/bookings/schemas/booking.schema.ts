import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.email("Enter a valid email"),
  phone: z.string().min(10).max(15),
  notes: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
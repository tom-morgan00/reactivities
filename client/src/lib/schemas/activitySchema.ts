import { z } from "zod";

export const activitySchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required"),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, "Description is required"),
  category: z
    .string({ required_error: "Category is required" })
    .min(1, "Category is required"),
  date: z.coerce.date({ message: "Date is required" }),
  location: z.object({
    venue: z
      .string({ required_error: "Venue is required" })
      .min(1, "Venue is required"),
    city: z.string().optional(),
    longitude: z.coerce.number(),
    latitude: z.coerce.number(),
  }),
});

export type ActivitySchema = z.infer<typeof activitySchema>;

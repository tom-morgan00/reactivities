import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  displayName: z.string({ required_error: "Name is required" }).min(1),
  password: z.string({ required_error: "Password is required" }).min(1),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

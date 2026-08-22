import { z } from "zod";

export const RegisterFormSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterFormData = z.infer<typeof RegisterFormSchema>;
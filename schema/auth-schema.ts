import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  passwordConfirm: z.string().min(8, "Minimun 8 Characters is Required !"),
  password: z.string().min(8, "Minimun 8 Characters is Required !"),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Minimun 8 Characters is Required !"),
});
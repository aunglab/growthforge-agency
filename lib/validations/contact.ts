import { z } from "zod";

const optionalTrimmedString = (max: number) =>
  z
    .string()
    .max(max, `Must be ${max} characters or less.`)
    .trim()
    .optional()
    .or(z.literal(""));

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(100, "Name must be 100 characters or less."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(150, "Email must be 150 characters or less."),
  phone: optionalTrimmedString(50),
  businessName: optionalTrimmedString(150),
  businessType: optionalTrimmedString(100),
  serviceInterested: z
    .string()
    .trim()
    .min(1, "Please select a service.")
    .max(100, "Service selection is too long."),
  budgetRange: optionalTrimmedString(50),
  message: optionalTrimmedString(2000),
  honeypot: z.string().optional().default("")
}).strict();

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactApiResponse = {
  success: boolean;
  message: string;
};

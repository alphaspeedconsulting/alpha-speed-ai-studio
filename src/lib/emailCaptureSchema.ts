import { z } from "zod";

export const EMAIL_INVALID_MESSAGE = "Please enter a valid email address";

export const emailCaptureSchema = z.object({
  email: z.string().email(EMAIL_INVALID_MESSAGE),
});

export type EmailCaptureFormData = z.infer<typeof emailCaptureSchema>;

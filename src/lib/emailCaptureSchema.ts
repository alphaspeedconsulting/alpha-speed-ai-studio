import { z } from "zod";

export const EMAIL_INVALID_MESSAGE = "Please enter a valid email address";

export const emailCaptureSchema = z.object({
  // zod 4: top-level z.email() replaces the deprecated z.string().email();
  // same pattern and message (pinned in __tests__/emailCaptureSchema.test.ts).
  email: z.email(EMAIL_INVALID_MESSAGE),
});

export type EmailCaptureFormData = z.infer<typeof emailCaptureSchema>;

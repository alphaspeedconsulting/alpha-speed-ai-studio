import { describe, it, expect } from "vitest";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  emailCaptureSchema,
  EMAIL_INVALID_MESSAGE,
} from "../emailCaptureSchema";

// Pins the email-capture form's validation results as they were under
// zod 3.25.76 + @hookform/resolvers 3.10.0, so the zod 4 upgrade cannot
// silently change which addresses the live form accepts or rejects.
const ACCEPTED = [
  "test@example.com",
  "a@b.co",
  "first.last@sub.example.co.uk",
  "user+tag@example.com",
  "user_name@example.io",
  "UPPER@EXAMPLE.COM",
  "o'brien@example.com",
  "a@example-.com",
  "a@xn--bcher-kva.com",
  "a-b@ex-ample.com",
  "a@sub.b.museum",
  "1@2.com",
];

const REJECTED = [
  "",
  " ",
  "abc",
  "abc@",
  "@example.com",
  "a@b",
  "a@b.c",
  "a@localhost",
  "a..b@example.com",
  ".a@example.com",
  "a.@example.com",
  "a@-example.com",
  "a@example..com",
  " test@example.com",
  "test@example.com ",
  "a b@example.com",
  "a@[127.0.0.1]",
  "a@127.0.0.1",
  '"quoted"@example.com',
  "üser@example.com",
  "user@exämple.com",
  "a@b.c1",
  "a%b@example.com",
  "a!b@example.com",
  "a#b@example.com",
  "a=b@example.com",
  "test@example.com.",
  "a@b.co\n",
  "a@@b.com",
];

describe("emailCaptureSchema", () => {
  it.each(ACCEPTED)("accepts %j", (email) => {
    const result = emailCaptureSchema.safeParse({ email });
    expect(result.success).toBe(true);
    expect(result.data).toEqual({ email });
  });

  it.each(REJECTED)("rejects %j with the form's message", (email) => {
    const result = emailCaptureSchema.safeParse({ email });
    expect(result.success).toBe(false);
    expect(result.error?.issues).toHaveLength(1);
    expect(result.error?.issues[0].path).toEqual(["email"]);
    expect(result.error?.issues[0].message).toBe(EMAIL_INVALID_MESSAGE);
  });
});

describe("zodResolver(emailCaptureSchema)", () => {
  const resolve = (email: string) =>
    zodResolver(emailCaptureSchema)({ email }, undefined, {
      fields: {},
      shouldUseNativeValidation: false,
    });

  it("returns values and no errors for a valid address", async () => {
    await expect(resolve("test@example.com")).resolves.toEqual({
      values: { email: "test@example.com" },
      errors: {},
    });
  });

  it.each(["", "a@b", "a@b.c"])(
    "returns an email field error for %j",
    async (email) => {
      const result = await resolve(email);
      expect(result.values).toEqual({});
      expect(Object.keys(result.errors)).toEqual(["email"]);
      expect(result.errors.email?.message).toBe(EMAIL_INVALID_MESSAGE);
    },
  );
});

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";
import { trackConversion } from "@/lib/analytics";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

const EmailCapture = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (url && key) {
      try {
        const params = new URLSearchParams(window.location.search);
        const res = await fetch(
          `${url.replace(/\/$/, "")}/rest/v1/email_subscribers`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: key,
              Authorization: `Bearer ${key}`,
              Prefer: "return=minimal",
            },
            body: JSON.stringify({
              email: data.email,
              source: params.get("utm_source") ?? "direct",
              utm_params: {
                source: params.get("utm_source"),
                medium: params.get("utm_medium"),
                campaign: params.get("utm_campaign"),
              },
            }),
          },
        );

        if (!res.ok && res.status !== 409) {
          throw new Error("Failed to subscribe");
        }
      } catch {
        setError("Something went wrong. Please try again.");
        return;
      }
    }

    trackConversion("sign_up", "email_capture_submit", {
      placement: "homepage_email_capture",
    });
    setSubmitted(true);
  };

  return (
    <section className="py-10 md:py-16 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-8 sm:p-10 rounded-2xl bg-card border border-border">
            <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Get AI Automation Tips
            </h2>
            <p className="text-muted-foreground mb-6">
              Weekly insights on how DFW businesses are using AI to save time and grow.
              No spam — unsubscribe anytime.
            </p>

            {submitted ? (
              <div className="flex items-center justify-center gap-2 text-primary font-medium py-3">
                <CheckCircle2 className="w-5 h-5" />
                You're in! Check your inbox.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    {...register("email")}
                    className="h-11"
                    aria-label="Email address"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1 text-left">
                      {errors.email.message}
                    </p>
                  )}
                  {error && (
                    <p className="text-sm text-destructive mt-1 text-left">
                      {error}
                    </p>
                  )}
                </div>
                <Button type="submit" variant="hero" size="default" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailCapture;

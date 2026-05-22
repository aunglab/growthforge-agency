"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, ShieldCheck, Clock3 } from "lucide-react";
import {
  contactSchema,
  type ContactApiResponse,
  type ContactInput
} from "@/lib/validations/contact";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const services = [
  "Social Media Marketing",
  "Short-Form Video Editing",
  "Paid Ads Management",
  "Website Development",
  "Landing Page Development",
  "Lead Generation System",
  "AI Automation",
  "CRM / Workflow Automation",
  "Website Security & Maintenance",
  "Full Growth System",
  "Not Sure Yet"
] as const;

const budgets = [
  "Not sure yet",
  "Under $500",
  "$500 - $1,000",
  "$1,000 - $3,000",
  "$3,000+"
] as const;

const contactTrustPoints = [
  "Recommendation based on your current stage and bottleneck",
  "Straightforward advice without inflated promises",
  "Security-conscious setup for lead capture and follow-up"
];

type FormState = ContactInput;

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  businessName: "",
  businessType: "",
  serviceInterested: "",
  budgetRange: "",
  message: "",
  honeypot: ""
};

export function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });
  const [loading, setLoading] = useState(false);

  const charCount = form.message.length;

  const setValue = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ type: "idle", message: "" });

    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0] ?? "",
        email: fieldErrors.email?.[0] ?? "",
        phone: fieldErrors.phone?.[0] ?? "",
        businessName: fieldErrors.businessName?.[0] ?? "",
        businessType: fieldErrors.businessType?.[0] ?? "",
        serviceInterested: fieldErrors.serviceInterested?.[0] ?? "",
        budgetRange: fieldErrors.budgetRange?.[0] ?? "",
        message: fieldErrors.message?.[0] ?? ""
      });
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data)
      });
      const data = (await response.json()) as ContactApiResponse;

      if (!response.ok || !data.success) {
        setStatus({
          type: "error",
          message: data.message || "Something went wrong. Please try again."
        });
        return;
      }

      setStatus({ type: "success", message: data.message });
      setForm(initialForm);
    } catch {
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-spacing bg-slate-900 text-white">
      <div className="section-container grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-start">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Let’s Map Out the Right Next Step
          </h2>
          <p className="mt-4 text-slate-300">
            Tell us what you are trying to improve and where execution is getting stuck. We will
            review your context and suggest the most practical next move.
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Quick form: only name, email, service, and message are required.
          </p>
          <div className="mt-6 space-y-3">
            {contactTrustPoints.map((point) => (
              <p key={point} className="flex items-start gap-2 text-sm text-slate-300">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-400" />
                <span>{point}</span>
              </p>
            ))}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-white">
                <Clock3 size={16} className="text-brand-400" />
                Typical response time
              </p>
              <p className="mt-1 text-xs text-slate-300">Within 1-2 business days.</p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-white">
                <ShieldCheck size={16} className="text-brand-400" />
                Data handling
              </p>
              <p className="mt-1 text-xs text-slate-300">
                Form submissions are validated server-side before processing and notification.
              </p>
            </div>
          </div>
        </div>

        <Card className="border-slate-700 bg-slate-800 text-white">
          <CardContent className="pt-6">
            <p className="mb-4 text-sm text-slate-300">
              Share a few details and we will reply with a clear recommendation.
            </p>
            <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit} noValidate>
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setValue("name", e.target.value)}
                  maxLength={100}
                  className="border-slate-600 bg-slate-900 text-white"
                  required
                />
                {errors.name ? <p className="mt-1 text-xs text-red-300">{errors.name}</p> : null}
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setValue("email", e.target.value)}
                  maxLength={150}
                  className="border-slate-600 bg-slate-900 text-white"
                  required
                />
                {errors.email ? (
                  <p className="mt-1 text-xs text-red-300">{errors.email}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="serviceInterested" className="mb-1 block text-sm font-medium">
                  Service Interested In
                </label>
                <Select
                  id="serviceInterested"
                  value={form.serviceInterested}
                  onChange={(e) => setValue("serviceInterested", e.target.value)}
                  className="border-slate-600 bg-slate-900 text-white"
                  required
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </Select>
                {errors.serviceInterested ? (
                  <p className="mt-1 text-xs text-red-300">{errors.serviceInterested}</p>
                ) : null}
              </div>

              <div className="md:col-span-2">
                <details className="rounded-xl border border-slate-700 bg-slate-900/60 p-4 open:bg-slate-900">
                  <summary className="cursor-pointer text-sm font-medium text-slate-200">
                    Add optional business details (recommended)
                  </summary>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                        Phone (optional)
                      </label>
                      <Input
                        id="phone"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) => setValue("phone", e.target.value)}
                        maxLength={50}
                        className="border-slate-600 bg-slate-900 text-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="businessName" className="mb-1 block text-sm font-medium">
                        Business Name (optional)
                      </label>
                      <Input
                        id="businessName"
                        autoComplete="organization"
                        value={form.businessName}
                        onChange={(e) => setValue("businessName", e.target.value)}
                        maxLength={150}
                        className="border-slate-600 bg-slate-900 text-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="businessType" className="mb-1 block text-sm font-medium">
                        Business Type (optional)
                      </label>
                      <Input
                        id="businessType"
                        value={form.businessType}
                        onChange={(e) => setValue("businessType", e.target.value)}
                        maxLength={100}
                        className="border-slate-600 bg-slate-900 text-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="budgetRange" className="mb-1 block text-sm font-medium">
                        Budget Range (optional)
                      </label>
                      <Select
                        id="budgetRange"
                        value={form.budgetRange}
                        onChange={(e) => setValue("budgetRange", e.target.value)}
                        className="border-slate-600 bg-slate-900 text-white"
                      >
                        <option value="">Select budget range</option>
                        {budgets.map((budget) => (
                          <option key={budget} value={budget}>
                            {budget}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </details>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="message" className="mb-1 block text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  autoComplete="off"
                  value={form.message}
                  onChange={(e) => setValue("message", e.target.value)}
                  maxLength={2000}
                  className="border-slate-600 bg-slate-900 text-white"
                  required
                />
                <div className="mt-1 flex items-center justify-between">
                  {errors.message ? (
                    <p className="text-xs text-red-300">{errors.message}</p>
                  ) : (
                    <span className="text-xs text-slate-300">Minimum 10 characters.</span>
                  )}
                  <span className="text-xs text-slate-300">{charCount}/2000</span>
                </div>
              </div>

              <div className="hidden">
                <label htmlFor="companyWebsite">Company Website</label>
                <input
                  id="companyWebsite"
                  name="companyWebsite"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.honeypot}
                  onChange={(e) => setValue("honeypot", e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                  {loading ? "Sending..." : "Book a Free Strategy Call"}
                </Button>
                {status.type !== "idle" ? (
                  <p
                    className={`mt-3 text-sm ${
                      status.type === "success" ? "text-emerald-300" : "text-red-300"
                    }`}
                  >
                    {status.message}
                  </p>
                ) : null}
                <p className="mt-2 text-xs text-slate-400">
                  We do not share your details. Your submission is validated server-side.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

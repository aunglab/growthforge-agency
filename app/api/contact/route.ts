import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { contactSchema, type ContactApiResponse } from "@/lib/validations/contact";

const successMessage = "Your message has been sent successfully.";
const genericErrorMessage = "Something went wrong. Please try again.";
const allowHeader = { Allow: "POST" };
const jsonHeader = { "Content-Type": "application/json" };

const safeResponse = (
  body: ContactApiResponse,
  status: number,
  extraHeaders?: Record<string, string>
) =>
  NextResponse.json(body, {
    status,
    headers: { ...jsonHeader, ...(extraHeaders ?? {}) }
  });

const methodNotAllowedResponse = () =>
  safeResponse({ success: false, message: "Method not allowed." }, 405, allowHeader);

function normalizeOptional(value?: string) {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return safeResponse(
      { success: false, message: "Invalid request format." },
      400
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return safeResponse(
      { success: false, message: "Invalid request payload." },
      400
    );
  }

  try {
    const parsed = contactSchema.safeParse(payload);

    if (!parsed.success) {
      return safeResponse(
        { success: false, message: "Please check your form and try again." },
        400
      );
    }

    const form = parsed.data;

    if (form.honeypot && form.honeypot.trim().length > 0) {
      return safeResponse({ success: true, message: successMessage }, 200);
    }

    const lead = await prisma.lead.create({
      data: {
        name: form.name,
        email: form.email,
        phone: normalizeOptional(form.phone ?? undefined),
        businessName: normalizeOptional(form.businessName ?? undefined),
        businessType: normalizeOptional(form.businessType ?? undefined),
        serviceInterested: form.serviceInterested,
        budgetRange: normalizeOptional(form.budgetRange ?? undefined),
        message: normalizeOptional(form.message ?? undefined)
      }
    });

    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.LEAD_NOTIFICATION_EMAIL;

    if (resendApiKey && notificationEmail) {
      const resend = new Resend(resendApiKey);
      try {
        await resend.emails.send({
          from: "GrowthForge Website <onboarding@resend.dev>",
          to: [notificationEmail],
          subject: "New lead from GrowthForge website",
          text: [
            `Submitted: ${new Date().toISOString()}`,
            `Name: ${lead.name}`,
            `Email: ${lead.email}`,
            `Phone: ${lead.phone ?? "N/A"}`,
            `Business name: ${lead.businessName ?? "N/A"}`,
            `Business type: ${lead.businessType ?? "N/A"}`,
            `Service interested: ${lead.serviceInterested}`,
            `Budget range: ${lead.budgetRange ?? "N/A"}`,
            `Message: ${lead.message ?? "N/A"}`
          ].join("\n")
        });
      } catch {
        return safeResponse({ success: true, message: successMessage }, 200);
      }
    }

    return safeResponse({ success: true, message: successMessage }, 200);
  } catch {
    return safeResponse({ success: false, message: genericErrorMessage }, 500);
  }
}

export async function GET() {
  return methodNotAllowedResponse();
}

export async function PUT() {
  return methodNotAllowedResponse();
}

export async function PATCH() {
  return methodNotAllowedResponse();
}

export async function DELETE() {
  return methodNotAllowedResponse();
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: allowHeader });
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken
} from "@/lib/server/admin-auth";
import { updateVideoProjectSchema } from "@/lib/validations/video-project";

async function isAuthorized(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return false;
  const session = await verifyAdminSessionToken(token);
  return Boolean(session);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  const parsed = updateVideoProjectSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: parsed.error.issues[0]?.message ?? "Invalid form fields." },
      { status: 400 }
    );
  }

  try {
    const form = parsed.data;
    const project = await prisma.videoProject.update({
      where: { id },
      data: {
        title: form.title,
        slug: form.slug,
        category: form.category,
        industry: form.industry === undefined ? undefined : form.industry || null,
        serviceType: form.serviceType,
        description: form.description,
        thumbnailUrl: form.thumbnailUrl,
        videoUrl: form.videoUrl,
        cloudinaryPublicId:
          form.cloudinaryPublicId === undefined ? undefined : form.cloudinaryPublicId || null,
        duration: form.duration === undefined ? undefined : form.duration || null,
        tags: form.tags,
        isFeatured: form.isFeatured,
        sortOrder: form.sortOrder
      }
    });

    return NextResponse.json({ success: true, project });
  } catch {
    return NextResponse.json(
      { success: false, message: "Could not update project. Check ID and slug uniqueness." },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    await prisma.videoProject.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: "Could not delete project. It may already be removed." },
      { status: 400 }
    );
  }
}

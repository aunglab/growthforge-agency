import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken
} from "@/lib/server/admin-auth";
import { createVideoProjectSchema } from "@/lib/validations/video-project";

async function isAuthorized(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return false;
  const session = await verifyAdminSessionToken(token);
  return Boolean(session);
}

export async function GET(request: NextRequest) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const projects = await prisma.videoProject.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }]
  });

  return NextResponse.json({ success: true, projects });
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  const parsed = createVideoProjectSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: parsed.error.issues[0]?.message ?? "Invalid form fields." },
      { status: 400 }
    );
  }

  try {
    const form = parsed.data;
    const project = await prisma.videoProject.create({
      data: {
        title: form.title,
        slug: form.slug,
        category: form.category,
        industry: form.industry || null,
        serviceType: form.serviceType,
        description: form.description,
        thumbnailUrl: form.thumbnailUrl,
        videoUrl: form.videoUrl,
        cloudinaryPublicId: form.cloudinaryPublicId || null,
        duration: form.duration || null,
        tags: form.tags,
        isFeatured: form.isFeatured,
        sortOrder: form.sortOrder
      }
    });

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Could not create project. Slug may already exist." },
      { status: 400 }
    );
  }
}

import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getAdminSessionMaxAge,
  isAdminAuthConfigured,
  isAdminCredentialMatch
} from "@/lib/server/admin-auth";

type LoginPayload = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { success: false, message: "Admin login is not configured yet." },
      { status: 500 }
    );
  }

  let payload: LoginPayload;
  try {
    payload = (await request.json()) as LoginPayload;
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  const email = payload.email?.trim() ?? "";
  const password = payload.password?.trim() ?? "";

  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: "Email and password are required." },
      { status: 400 }
    );
  }

  if (!isAdminCredentialMatch(email, password)) {
    return NextResponse.json({ success: false, message: "Invalid credentials." }, { status: 401 });
  }

  const token = await createAdminSessionToken({ email });
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unable to create session. Check admin configuration." },
      { status: 500 }
    );
  }

  const response = NextResponse.json({ success: true, message: "Signed in successfully." });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: getAdminSessionMaxAge()
  });

  return response;
}

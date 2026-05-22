import { jwtVerify, SignJWT } from "jose";

export const ADMIN_SESSION_COOKIE = "gf_admin_session";

const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

type AdminSessionPayload = {
  email: string;
};

function getEnvConfig() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  return {
    adminEmail,
    adminPassword,
    sessionSecret
  };
}

function getSessionSecretKey() {
  const { sessionSecret } = getEnvConfig();
  if (!sessionSecret) return null;
  return new TextEncoder().encode(sessionSecret);
}

export function isAdminCredentialMatch(email: string, password: string) {
  const { adminEmail, adminPassword } = getEnvConfig();
  if (!adminEmail || !adminPassword) return false;
  return email === adminEmail && password === adminPassword;
}

export function isAdminAuthConfigured() {
  const { adminEmail, adminPassword, sessionSecret } = getEnvConfig();
  return Boolean(adminEmail && adminPassword && sessionSecret);
}

export async function createAdminSessionToken(payload: AdminSessionPayload) {
  const secretKey = getSessionSecretKey();
  if (!secretKey) return null;

  return new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.email)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(secretKey);
}

export async function verifyAdminSessionToken(token: string) {
  const secretKey = getSessionSecretKey();
  if (!secretKey) return null;

  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ["HS256"]
    });

    const email = typeof payload.email === "string" ? payload.email : null;
    if (!email) return null;

    return { email };
  } catch {
    return null;
  }
}

export function getAdminSessionMaxAge() {
  return SESSION_DURATION_SECONDS;
}

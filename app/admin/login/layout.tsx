import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Private login for GrowthForge admin tools.",
  robots: {
    index: false,
    follow: false,
    nocache: true
  }
};

export default function AdminLoginLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}

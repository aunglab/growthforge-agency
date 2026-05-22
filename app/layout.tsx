import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GrowthForge Agency",
    template: "%s | GrowthForge Agency"
  },
  description:
    "GrowthForge Agency helps businesses grow with digital marketing, high-converting websites, short-form video content, lead generation systems, automation, and security-conscious web setup.",
  applicationName: "GrowthForge Agency",
  keywords: [
    "digital marketing agency",
    "website development",
    "lead generation systems",
    "marketing automation",
    "short-form video editing",
    "Myanmar business growth agency"
  ],
  openGraph: {
    type: "website",
    siteName: "GrowthForge Agency",
    title: "GrowthForge Agency | Marketing, Websites & Automation Systems",
    description:
      "GrowthForge Agency helps businesses grow with digital marketing, high-converting websites, short-form video content, lead generation systems, automation, and security-conscious web setup.",
    url: "/",
    images: [
      {
        url: "/images/og-growthforge.svg",
        width: 1200,
        height: 630,
        alt: "GrowthForge Agency brand preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "GrowthForge Agency | Marketing, Websites & Automation Systems",
    description:
      "GrowthForge Agency helps businesses grow with marketing, websites, automation, and secure digital systems.",
    images: ["/images/og-growthforge.svg"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

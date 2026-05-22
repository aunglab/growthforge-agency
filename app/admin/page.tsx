import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Admin",
  description: "Internal admin placeholder for GrowthForge Agency.",
  robots: {
    index: false,
    follow: false,
    nocache: true
  }
};

export default function AdminPage() {
  const plannedFeatures = [
    "Authentication and role-based authorization",
    "Lead inbox with status updates and filtering",
    "Portfolio project create/edit/delete tools",
    "Featured project and sort-order controls",
    "Secure Cloudinary upload flow for admin users only",
    "Testimonials, FAQs, and blog content management",
    "Basic analytics snapshot"
  ];

  return (
    <>
      <Navbar />
      <main className="section-spacing">
        <div className="section-container">
          <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
            <h1 className="text-3xl font-bold text-slate-900">Admin dashboard coming soon.</h1>
            <p className="mt-4 text-slate-600">
              This area is reserved for future internal operations. Private lead data and content
              management tools are intentionally hidden until proper authentication and authorization
              are implemented.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-700">
              {plannedFeatures.map((feature) => (
                <li key={feature} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AdminPortfolioManager } from "@/components/admin/AdminPortfolioManager";

export const metadata: Metadata = {
  title: "Admin",
  description: "Private admin area for GrowthForge Agency.",
  robots: {
    index: false,
    follow: false,
    nocache: true
  }
};

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <main className="section-spacing">
        <div className="section-container">
          <AdminPortfolioManager />
        </div>
      </main>
      <Footer />
    </>
  );
}

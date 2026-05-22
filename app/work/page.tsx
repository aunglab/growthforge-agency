import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { Button } from "@/components/ui/button";
import { portfolioCategories, portfolioProjects } from "@/lib/data/portfolio";

export const metadata: Metadata = {
  title: "Video Portfolio & Sample Projects",
  description:
    "Explore sample video edits, campaign concepts, website projects, and automation-focused work from GrowthForge Agency.",
  alternates: {
    canonical: "/work"
  },
  openGraph: {
    title: "Video Portfolio & Sample Projects | GrowthForge Agency",
    description:
      "Explore sample video edits, campaign concepts, website projects, and automation-focused work from GrowthForge Agency.",
    url: "/work",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Video Portfolio & Sample Projects | GrowthForge Agency",
    description:
      "Explore sample video edits, campaign concepts, website projects, and automation-focused work from GrowthForge Agency."
  }
};

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main className="section-spacing">
        <div className="section-container">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
            <p className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
              GrowthForge Showcase Library
            </p>
            <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Video Portfolio & Sample Projects
            </h1>
            <p className="mt-4 max-w-4xl text-slate-600">
              A curated set of sample edits, campaign concepts, website builds, and automation
              demos that show how we approach planning, production, and follow-through.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              No inflated claims. Every item is clearly labeled as a sample, concept, or demo.
            </p>
            <div className="mt-5 grid gap-3 text-xs text-slate-600 sm:grid-cols-3">
              <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                Cloudinary-hosted thumbnails and videos
              </p>
              <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                Video loads only when modal opens
              </p>
              <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                Easy replacement of `thumbnailUrl` and `videoUrl`
              </p>
            </div>
          </section>
          <div className="mt-10">
            <PortfolioGrid
              projects={portfolioProjects}
              categories={portfolioCategories}
              initialCount={4}
            />
          </div>
          <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white sm:p-8">
            <h2 className="text-xl font-semibold">
              Need a system like this built for your business?
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Share your key bottleneck and commercial priorities. We will suggest a practical plan
              that fits your stage.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/#contact">
                <Button>Book a Free Strategy Call</Button>
              </Link>
              <Link href="/#services">
                <Button variant="outline" className="border-slate-500 bg-transparent text-white hover:bg-slate-800">
                  View Services
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

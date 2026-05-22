import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { FutureReady } from "@/components/sections/FutureReady";
import { WhoWeHelp } from "@/components/sections/WhoWeHelp";
import { Process } from "@/components/sections/Process";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { About } from "@/components/sections/About";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: {
    absolute: "GrowthForge Agency | Marketing, Websites & Automation Systems"
  },
  description:
    "GrowthForge Agency helps businesses grow with digital marketing, high-converting websites, short-form video content, lead generation systems, automation, and security-conscious web setup.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "GrowthForge Agency | Marketing, Websites & Automation Systems",
    description:
      "GrowthForge Agency helps businesses grow with digital marketing, high-converting websites, short-form video content, lead generation systems, automation, and security-conscious web setup.",
    url: "/",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "GrowthForge Agency | Marketing, Websites & Automation Systems",
    description:
      "GrowthForge Agency helps businesses grow with digital marketing, high-converting websites, short-form video content, lead generation systems, automation, and security-conscious web setup."
  }
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <FutureReady />
        <WhoWeHelp />
        <Process />
        <PortfolioPreview />
        <WhyChooseUs />
        <About />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

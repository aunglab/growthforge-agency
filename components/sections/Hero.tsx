import Link from "next/link";
import {
  ShieldCheck,
  Workflow,
  LineChart,
  Users,
  CheckCircle2,
  Layers,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const dashboardItems = [
  { label: "Lead capture", icon: Users },
  { label: "Campaign health", icon: LineChart },
  { label: "Website conversion", icon: Layers },
  { label: "Automation status", icon: Workflow },
  { label: "Security checklist", icon: ShieldCheck },
  { label: "Content pipeline", icon: CheckCircle2 }
];

const heroTrustPoints = [
  "We start with priorities, not random tactics",
  "Marketing, website, and automation planned as one operating system",
  "Security-conscious setup for business-critical workflows"
];

export function Hero() {
  return (
    <section
      id="home"
      className="section-spacing bg-[radial-gradient(circle_at_top,_rgba(77,120,255,0.15),_transparent_50%)]"
    >
      <div className="section-container grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            Practical Digital Systems
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Marketing, Websites, and Automation Built to Turn Interest Into Real Enquiries
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            We help businesses attract the right audience, improve conversion quality, and tighten
            follow-up with focused marketing, conversion-ready websites, paid media, and practical
            automation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#contact">
              <Button size="lg" className="gap-2">
                Book a Free Strategy Call <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/work">
              <Button variant="outline" size="lg">
                View Work
              </Button>
            </Link>
          </div>
          <div className="mt-6 space-y-2">
            {heroTrustPoints.map((point) => (
              <p key={point} className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-600" />
                <span>{point}</span>
              </p>
            ))}
          </div>
        </div>

        <Card className="border-slate-200 bg-slate-900 p-6 text-white shadow-2xl shadow-slate-900/20 sm:p-7">
          <p className="mb-1 text-sm font-medium text-slate-300">Growth System Snapshot</p>
          <p className="mb-5 text-xs text-slate-400">
            Example planning blocks we use to keep execution clear and accountable.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {dashboardItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-xl border border-slate-700 bg-slate-800/80 p-4 transition hover:border-slate-500"
                >
                  <div className="mb-2 inline-flex rounded-md bg-slate-700 p-2">
                    <Icon size={16} />
                  </div>
                  <p className="text-sm font-medium">{item.label}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </section>
  );
}

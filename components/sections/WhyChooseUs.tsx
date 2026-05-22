import { CheckCircle2 } from "lucide-react";

const points = [
  "Clear plan before production",
  "Pages built for decisions, not decoration",
  "Business constraints considered early",
  "Content and automation designed together",
  "Direct communication and clean handoffs",
  "Systems that scale without rebuilds",
  "Security-conscious website setup",
  "Scope options for small and growing teams"
];

export function WhyChooseUs() {
  return (
    <section className="section-spacing bg-slate-900 text-white">
      <div className="section-container">
        <h2 className="text-3xl font-bold sm:text-4xl">Why Businesses Choose GrowthForge</h2>
        <p className="mt-4 max-w-3xl text-slate-300">
          We focus on execution quality, commercial clarity, and usable systems your team can
          operate after launch.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {points.map((point) => (
            <div key={point} className="flex items-center gap-3 rounded-xl border border-slate-700 p-4">
              <CheckCircle2 size={18} className="text-brand-400" />
              <p className="text-sm text-slate-200">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

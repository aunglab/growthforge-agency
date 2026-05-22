import { ArrowRight } from "lucide-react";

const points = [
  "Website now, automation later",
  "Content now, sales funnel later",
  "Social media now, CRM later",
  "Manual process now, AI workflow later",
  "Landing page now, analytics later",
  "Website now, security and maintenance later"
];

export function FutureReady() {
  return (
    <section className="section-spacing bg-slate-900 text-white">
      <div className="section-container">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Built for What Comes Next
          </h2>
          <p className="mt-4 text-slate-300">
            Most teams start with isolated tools and ad-hoc execution. Over time, that creates
            bottlenecks. This setup helps you move from fragmented activity to clearer systems for
            lead capture, handoff, automation, and reporting.
          </p>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {points.map((point) => (
            <div key={point} className="flex items-center gap-3 rounded-xl border border-slate-700 p-4">
              <ArrowRight size={16} className="text-brand-400" />
              <p className="text-sm text-slate-100">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

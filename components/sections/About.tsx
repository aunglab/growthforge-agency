import { Card } from "@/components/ui/card";

const pillars = ["Marketing", "Websites", "Automation", "Security"];

export function About() {
  return (
    <section className="section-spacing bg-white">
      <div className="section-container grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            More Than Campaign Delivery
          </h2>
          <p className="mt-4 text-slate-600">
            We combine marketing, web delivery, automation, and security-conscious setup so your
            team gets an operating system, not just isolated tasks. The result is a clearer path
            from attention to enquiry to follow-up.
          </p>
        </div>
        <Card className="grid gap-4 p-6 sm:grid-cols-2">
          {pillars.map((pillar) => (
            <div key={pillar} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">{pillar}</p>
            </div>
          ))}
        </Card>
      </div>
    </section>
  );
}

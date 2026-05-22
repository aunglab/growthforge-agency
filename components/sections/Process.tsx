const steps = [
  {
    title: "Step 1: Discovery",
    description: "Review your offer, audience, bottlenecks, and current setup."
  },
  {
    title: "Step 2: Strategy",
    description: "Define priorities, channels, and the execution roadmap."
  },
  {
    title: "Step 3: Build",
    description: "Produce the assets: pages, campaigns, content systems, and workflows."
  },
  {
    title: "Step 4: Launch",
    description: "Launch, connect tools, and start collecting qualified enquiries."
  },
  {
    title: "Step 5: Optimize",
    description: "Use real performance data to improve weak points and scale winners."
  }
];

export function Process() {
  return (
    <section id="process" className="section-spacing bg-white">
      <div className="section-container">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          A Straightforward Process That Keeps Projects on Track
        </h2>
        <p className="mt-4 max-w-3xl text-slate-600">
          You always know what happens next, what is being built, and how decisions are made.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

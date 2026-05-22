const trustPoints = [
  "Business goals before channel tactics",
  "Content, ads, and website alignment",
  "Workflow automation built for real teams",
  "Security-conscious delivery standards"
];

export function TrustBar() {
  return (
    <section className="border-y border-slate-200 bg-white py-6">
      <div className="section-container">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point) => (
            <p
              key={point}
              className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-medium text-slate-700"
            >
              {point}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

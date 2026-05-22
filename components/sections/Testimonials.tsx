import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "The team helped us understand how to turn our online presence into real leads.",
    label: "Sample testimonial"
  },
  {
    quote: "Our website became clearer, faster, and more professional.",
    label: "Sample testimonial"
  },
  {
    quote: "The automation idea helped us see how much time we could save in follow-up.",
    label: "Sample testimonial"
  }
];

export function Testimonials() {
  return (
    <section className="section-spacing bg-slate-100">
      <div className="section-container">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Sample Testimonials (Replaceable)
        </h2>
        <p className="mt-3 text-sm text-slate-600">
          These placeholders are here for layout and tone. Replace them with verified client quotes
          as delivery history grows.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.quote}>
              <CardContent className="pt-6">
                <p className="text-sm leading-relaxed text-slate-700">“{item.quote}”</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-700">
                  {item.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

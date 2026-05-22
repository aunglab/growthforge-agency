import Link from "next/link";
import { pricingPackages } from "@/lib/data/pricing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Pricing() {
  return (
    <section id="pricing" className="section-spacing">
      <div className="section-container">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Packages Matched to Business Stage and Scope
          </h2>
          <p className="mt-4 text-slate-600">
            We scope around your priorities, internal capacity, and timeline. Final pricing is
            provided after a short strategy call.
          </p>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {pricingPackages.map((item) => (
            <Card key={item.title} className="h-full">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <p className="text-sm text-slate-600">{item.subtitle}</p>
                <p className="text-xl font-semibold text-brand-700">{item.priceLabel}</p>
              </CardHeader>
              <CardContent className="flex h-full flex-col justify-between gap-6">
                <ul className="space-y-2 text-sm text-slate-700">
                  {item.items.map((service) => (
                    <li key={service}>• {service}</li>
                  ))}
                </ul>
                <Link href="#contact">
                  <Button className="w-full">Book a Free Strategy Call</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

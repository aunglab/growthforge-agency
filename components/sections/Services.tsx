import Link from "next/link";
import { services } from "@/lib/data/services";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Services() {
  return (
    <section id="services" className="section-spacing">
      <div className="section-container">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Services Built Around Practical Business Outcomes
            </h2>
            <p className="mt-4 text-slate-600">
              Each service is designed to support the full path from visibility to enquiry to
              follow-up, so your team is not stuck managing disconnected tools.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link href="/work">
              <Button variant="outline">View Work</Button>
            </Link>
            <Link href="#contact">
              <Button>Book a Free Strategy Call</Button>
            </Link>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.title} className="h-full transition hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-3 inline-flex w-fit rounded-md bg-brand-50 p-2 text-brand-700">
                    <Icon size={20} />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

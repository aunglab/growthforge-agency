import Image from "next/image";
import Link from "next/link";
import { portfolioProjects } from "@/lib/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function PortfolioPreview() {
  const featured = portfolioProjects.filter((item) => item.isFeatured).slice(0, 3);

  return (
    <section className="section-spacing">
      <div className="section-container">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Selected Work and Concept Builds
            </h2>
            <p className="mt-4 text-slate-600">
              Browse sample projects across content, websites, and automation to see how we turn
              strategy into production-ready deliverables.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Each card is clearly marked as a sample, concept, or demo so expectations stay clear.
            </p>
          </div>
          <Link href="/work">
            <Button variant="outline">View Work</Button>
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((project) => (
            <Card key={project.id} className="overflow-hidden transition hover:-translate-y-1">
              <div className="relative h-48 w-full bg-slate-200">
                <Image
                  src={project.thumbnailUrl}
                  alt={`${project.title} preview showing ${project.serviceType} sample work`}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <CardContent className="pt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                  {project.category}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">{project.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{project.description}</p>
                <p className="mt-3 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Service:</span>{" "}
                  {project.serviceType}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Industry:</span>{" "}
                  {project.industry}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <Link href="/work" className="mt-4 inline-block">
                  <Button size="sm">View Work</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

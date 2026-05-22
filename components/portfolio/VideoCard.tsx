import Image from "next/image";
import { Play } from "lucide-react";
import { PortfolioProject } from "@/lib/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type VideoCardProps = {
  project: PortfolioProject;
  onWatch: (project: PortfolioProject) => void;
};

export function VideoCard({ project, onWatch }: VideoCardProps) {
  const primaryLabel = project.tags[0] ?? "Sample Project";

  return (
    <Card className="overflow-hidden border-slate-200 transition-transform duration-300 hover:-translate-y-1">
      <div className="relative h-52 w-full overflow-hidden bg-slate-200">
        <Image
          src={project.thumbnailUrl}
          alt={`${project.title} sample thumbnail for ${project.category} in ${project.industry}`}
          fill
          className="object-cover"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-slate-900/80 to-transparent p-3">
          <Badge className="border-white/20 bg-white/10 text-white">{primaryLabel}</Badge>
          <Badge className="border-white/20 bg-white/10 text-white">
            {project.duration}
          </Badge>
        </div>
      </div>
      <CardContent className="space-y-3 pt-5">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-700">
            {project.category}
          </p>
          <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
          <p className="text-sm text-slate-600">{project.description}</p>
        </div>
        <div className="grid gap-2 text-xs text-slate-600 sm:grid-cols-2">
          <p>
            <span className="font-semibold text-slate-800">Industry:</span> {project.industry}
          </p>
          <p>
            <span className="font-semibold text-slate-800">Service:</span> {project.serviceType}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <Button className="w-full gap-2" onClick={() => onWatch(project)}>
          <Play size={16} /> Watch Sample
        </Button>
      </CardContent>
    </Card>
  );
}

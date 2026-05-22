"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { PortfolioProject } from "@/lib/data/portfolio";
import { Button } from "@/components/ui/button";
import { CategoryFilter } from "@/components/portfolio/CategoryFilter";
import { VideoCard } from "@/components/portfolio/VideoCard";

const VideoModal = dynamic(
  () => import("@/components/portfolio/VideoModal").then((module) => module.VideoModal),
  { ssr: false }
);

type PortfolioGridProps = {
  projects: PortfolioProject[];
  categories: readonly string[];
  initialCount?: number;
};

export function PortfolioGrid({
  projects,
  categories,
  initialCount = 6
}: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => a.sortOrder - b.sortOrder),
    [projects]
  );

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return sortedProjects;
    return sortedProjects.filter((project) => project.category === activeCategory);
  }, [activeCategory, sortedProjects]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: sortedProjects.length
    };
    for (const category of categories) {
      if (category === "All") continue;
      counts[category] = sortedProjects.filter((project) => project.category === category).length;
    }
    return counts;
  }, [categories, sortedProjects]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;
  const remainingCount = Math.max(filteredProjects.length - visibleProjects.length, 0);

  return (
    <div className="space-y-8">
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        categoryCounts={categoryCounts}
        onCategoryChange={(category) => {
          setActiveCategory(category);
          setVisibleCount(initialCount);
        }}
      />
      <p className="text-sm text-slate-600">
        Showing <span className="font-semibold text-slate-800">{visibleProjects.length}</span> of{" "}
        <span className="font-semibold text-slate-800">{filteredProjects.length}</span> projects
        {activeCategory !== "All" ? ` in ${activeCategory}` : ""}.
      </p>

      {visibleProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project) => (
            <VideoCard key={project.id} project={project} onWatch={setSelectedProject} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <h3 className="text-lg font-semibold text-slate-900">No projects in this category yet.</h3>
          <p className="mt-2 text-sm text-slate-600">
            Try another category or check back as new samples are added.
          </p>
        </div>
      )}

      {hasMore ? (
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => setVisibleCount((prev) => prev + initialCount)}>
            Load More ({remainingCount} left)
          </Button>
        </div>
      ) : filteredProjects.length > 0 ? (
        <p className="text-center text-xs text-slate-500">
          You have reached the end of this category.
        </p>
      ) : null}

      {selectedProject ? (
        <VideoModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      ) : null}
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";

type CategoryFilterProps = {
  categories: readonly string[];
  activeCategory: string;
  categoryCounts: Record<string, number>;
  onCategoryChange: (category: string) => void;
};

export function CategoryFilter({
  categories,
  activeCategory,
  categoryCounts,
  onCategoryChange
}: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition",
              isActive
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
            )}
          >
            {category}
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs",
                isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
              )}
            >
              {categoryCounts[category] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}

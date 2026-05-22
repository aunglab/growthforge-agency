import { prisma } from "@/lib/prisma";
import {
  portfolioCategories,
  portfolioProjects as fallbackProjects,
  type PortfolioProject
} from "@/lib/data/portfolio";

type KnownCategory = Exclude<(typeof portfolioCategories)[number], "All">;

const knownCategories = new Set<KnownCategory>(
  portfolioCategories.filter((category): category is KnownCategory => category !== "All")
);

function isKnownCategory(category: string): category is KnownCategory {
  return knownCategories.has(category as KnownCategory);
}

function normalizeCategory(category: string): PortfolioProject["category"] {
  if (isKnownCategory(category)) {
    return category;
  }
  return "Website Projects";
}

function mapDbProjectToPortfolio(project: {
  id: string;
  title: string;
  slug: string;
  category: string;
  industry: string | null;
  serviceType: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string | null;
  tags: string[];
  isFeatured: boolean;
  sortOrder: number;
}): PortfolioProject {
  return {
    id: project.id,
    title: project.title,
    slug: project.slug,
    category: normalizeCategory(project.category),
    industry: project.industry ?? "General",
    serviceType: project.serviceType,
    description: project.description,
    thumbnailUrl: project.thumbnailUrl,
    videoUrl: project.videoUrl,
    duration: project.duration ?? "N/A",
    tags: project.tags,
    isFeatured: project.isFeatured,
    sortOrder: project.sortOrder
  };
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  if (!process.env.DATABASE_URL) {
    return fallbackProjects;
  }

  try {
    const dbProjects = await prisma.videoProject.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }]
    });

    if (dbProjects.length === 0) {
      return fallbackProjects;
    }

    return dbProjects.map(mapDbProjectToPortfolio);
  } catch {
    return fallbackProjects;
  }
}

export async function getFeaturedPortfolioProjects(limit = 3): Promise<PortfolioProject[]> {
  const projects = await getPortfolioProjects();
  return projects.filter((project) => project.isFeatured).slice(0, limit);
}

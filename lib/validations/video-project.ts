import { z } from "zod";
import { portfolioCategories } from "@/lib/data/portfolio";

const validCategories = portfolioCategories.filter((category) => category !== "All");

const optionalString = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Must be ${max} characters or fewer.`)
    .optional()
    .or(z.literal(""));

const optionalUrl = z.string().trim().url("Please enter a valid URL.").optional().or(z.literal(""));

const optionalTags = z
  .array(z.string().trim().min(1).max(40))
  .max(12)
  .optional()
  .default([]);

export const createVideoProjectSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(150),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required.")
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only."),
  category: z.enum(validCategories as [string, ...string[]], {
    message: "Please choose a valid category."
  }),
  industry: optionalString(120),
  serviceType: z.string().trim().min(1, "Service type is required.").max(120),
  description: z.string().trim().min(1, "Description is required.").max(1000),
  thumbnailUrl: z.string().trim().url("Thumbnail URL must be valid.").max(500),
  videoUrl: z.string().trim().url("Video URL must be valid.").max(500),
  cloudinaryPublicId: optionalString(180),
  duration: optionalString(20),
  tags: optionalTags,
  isFeatured: z.boolean().default(false),
  sortOrder: z.number().int().min(0).max(100000).default(0)
});

export const updateVideoProjectSchema = createVideoProjectSchema.partial();

export type CreateVideoProjectInput = z.infer<typeof createVideoProjectSchema>;
export type UpdateVideoProjectInput = z.infer<typeof updateVideoProjectSchema>;

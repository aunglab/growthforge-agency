export type LeadStatus = "new" | "contacted" | "qualified" | "closed" | "archived";

export type AdminLeadListItem = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  businessName: string | null;
  serviceInterested: string;
  status: LeadStatus;
  createdAt: Date;
};

export type AdminLeadFilters = {
  query?: string;
  status?: LeadStatus;
  serviceInterested?: string;
  createdAfter?: Date;
  createdBefore?: Date;
};

export type AdminPortfolioProjectInput = {
  title: string;
  slug: string;
  category: string;
  industry?: string;
  serviceType: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  cloudinaryPublicId?: string;
  duration?: string;
  tags: string[];
  isFeatured?: boolean;
  sortOrder?: number;
};

export type AdminContentEntity = "testimonials" | "faqs" | "blogPosts";

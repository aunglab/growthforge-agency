import type {
  AdminLeadFilters,
  AdminLeadListItem,
  AdminPortfolioProjectInput,
  LeadStatus
} from "@/lib/admin/types";

export interface LeadAdminRepository {
  list(filters?: AdminLeadFilters): Promise<AdminLeadListItem[]>;
  getById(id: string): Promise<AdminLeadListItem | null>;
  updateStatus(id: string, status: LeadStatus): Promise<void>;
}

export interface PortfolioAdminRepository {
  create(input: AdminPortfolioProjectInput): Promise<string>;
  update(id: string, input: Partial<AdminPortfolioProjectInput>): Promise<void>;
  remove(id: string): Promise<void>;
  setFeatured(id: string, featured: boolean): Promise<void>;
}

export interface AdminAuthContract {
  requireAuthenticatedUser(): Promise<{ userId: string; role: string }>;
  requireAdminRole(): Promise<void>;
}

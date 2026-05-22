import {
  BarChart3,
  Bot,
  ChartNoAxesColumn,
  Film,
  Globe,
  ShieldCheck,
  Target,
  UserRoundSearch,
  Workflow
} from "lucide-react";

export const services = [
  {
    title: "Social Media Marketing",
    description:
      "Editorial planning, channel strategy, and positioning support to help your brand stay visible and consistent across key platforms.",
    icon: UserRoundSearch
  },
  {
    title: "Short-Form Video Editing",
    description:
      "Short-form edits for Reels, TikTok, and Shorts with strong hooks, clear pacing, captions, and conversion-aware structure.",
    icon: Film
  },
  {
    title: "Paid Ads Management",
    description:
      "Paid campaign management across Meta, TikTok, and Google with testing cycles focused on enquiry quality and cost control.",
    icon: Target
  },
  {
    title: "Website & Landing Page Development",
    description:
      "Business websites and landing pages built for clear messaging, fast performance, trust signals, and stronger conversion flow.",
    icon: Globe
  },
  {
    title: "Lead Generation Systems",
    description:
      "Lead capture systems that connect forms, funnels, CRM pipelines, and follow-up actions into one usable process.",
    icon: ChartNoAxesColumn
  },
  {
    title: "AI & Business Automation",
    description:
      "Automation workflows using tools like n8n and AI assistants for routing, follow-up, reporting, and repetitive operational tasks.",
    icon: Bot
  },
  {
    title: "Brand & Content Strategy",
    description:
      "Offer positioning, customer insight, messaging direction, and content angles that support stronger campaign decisions.",
    icon: BarChart3
  },
  {
    title: "Analytics & Reporting",
    description:
      "Simple reporting dashboards with useful performance context, monthly summaries, and practical next-step recommendations.",
    icon: Workflow
  },
  {
    title: "Website Security & Maintenance",
    description:
      "Security-conscious website setup with SSL guidance, secure forms, spam protection, update routines, and backup planning.",
    icon: ShieldCheck
  }
] as const;

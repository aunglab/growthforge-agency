export type PortfolioProject = {
  id: string;
  title: string;
  slug: string;
  category:
    | "Short-form Ads"
    | "Restaurant Videos"
    | "Real Estate Videos"
    | "Product Videos"
    | "Personal Brand Videos"
    | "Before / After Edits"
    | "Website Projects"
    | "Automation Projects";
  industry: string;
  serviceType: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  tags: string[];
  isFeatured: boolean;
  sortOrder: number;
};

export const portfolioCategories = [
  "All",
  "Short-form Ads",
  "Restaurant Videos",
  "Real Estate Videos",
  "Product Videos",
  "Personal Brand Videos",
  "Before / After Edits",
  "Website Projects",
  "Automation Projects"
] as const;

const sampleCloudinaryBase = "https://res.cloudinary.com/demo";

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "1",
    title: "Restaurant Food Reel Showcase",
    slug: "restaurant-reels-campaign",
    category: "Restaurant Videos",
    industry: "Food & Beverage",
    serviceType: "Short-form Video Editing",
    description:
      "A high-retention short-form video concept for restaurants, focused on food close-ups, quick pacing, captions, and a clear call-to-action.",
    thumbnailUrl: `${sampleCloudinaryBase}/image/upload/v1710000001/growthforge/restaurant-sample.jpg`,
    videoUrl: `${sampleCloudinaryBase}/video/upload/v1710000001/growthforge/restaurant-sample.mp4`,
    duration: "00:35",
    tags: ["Sample Project", "Demo Edit", "Content"],
    isFeatured: true,
    sortOrder: 1
  },
  {
    id: "2",
    title: "Property Walkthrough Video Concept",
    slug: "real-estate-lead-video",
    category: "Real Estate Videos",
    industry: "Real Estate",
    serviceType: "Lead Generation Content",
    description:
      "A real estate video concept designed to highlight property value, location benefits, and inquiry-focused messaging.",
    thumbnailUrl: `${sampleCloudinaryBase}/image/upload/v1710000002/growthforge/real-estate-sample.jpg`,
    videoUrl: `${sampleCloudinaryBase}/video/upload/v1710000002/growthforge/real-estate-sample.mp4`,
    duration: "00:45",
    tags: ["Concept Project", "Lead Gen"],
    isFeatured: true,
    sortOrder: 2
  },
  {
    id: "3",
    title: "Online Shop Product Ad Sample",
    slug: "product-promo-edit",
    category: "Product Videos",
    industry: "E-commerce",
    serviceType: "Product Marketing Video",
    description:
      "A product-focused promotional edit using hooks, fast cuts, benefit captions, and conversion-focused pacing.",
    thumbnailUrl: `${sampleCloudinaryBase}/image/upload/v1710000003/growthforge/product-sample.jpg`,
    videoUrl: `${sampleCloudinaryBase}/video/upload/v1710000003/growthforge/product-sample.mp4`,
    duration: "00:30",
    tags: ["Sample Project", "Demo Edit"],
    isFeatured: true,
    sortOrder: 3
  },
  {
    id: "4",
    title: "Personal Brand Talking-Head Reel",
    slug: "personal-brand-authority-reel",
    category: "Personal Brand Videos",
    industry: "Coaching / Consulting",
    serviceType: "Personal Brand Content",
    description:
      "A personal brand content sample designed to build trust, explain an idea clearly, and encourage audience engagement.",
    thumbnailUrl: `${sampleCloudinaryBase}/image/upload/v1710000004/growthforge/personal-brand-sample.jpg`,
    videoUrl: `${sampleCloudinaryBase}/video/upload/v1710000004/growthforge/personal-brand-sample.mp4`,
    duration: "00:40",
    tags: ["Concept Project", "Content Strategy"],
    isFeatured: false,
    sortOrder: 4
  },
  {
    id: "5",
    title: "Before / After Editing Sample",
    slug: "before-after-editing-sample",
    category: "Before / After Edits",
    industry: "Content Creator",
    serviceType: "Video Editing",
    description:
      "A comparison-style editing sample showing how raw footage can be transformed with pacing, captions, sound design, and structure.",
    thumbnailUrl: `${sampleCloudinaryBase}/image/upload/v1710000005/growthforge/before-after-sample.jpg`,
    videoUrl: `${sampleCloudinaryBase}/video/upload/v1710000005/growthforge/before-after-sample.mp4`,
    duration: "00:25",
    tags: ["Demo Edit", "Sample Project"],
    isFeatured: false,
    sortOrder: 5
  },
  {
    id: "6",
    title: "Landing Page Redesign Concept",
    slug: "landing-page-redesign-concept",
    category: "Website Projects",
    industry: "Service Business",
    serviceType: "Website & Landing Page Development",
    description:
      "A landing page concept focused on clear messaging, stronger trust signals, better CTA placement, and conversion-focused layout.",
    thumbnailUrl: `${sampleCloudinaryBase}/image/upload/v1710000006/growthforge/landing-page-concept.jpg`,
    videoUrl: `${sampleCloudinaryBase}/video/upload/v1710000006/growthforge/landing-page-concept.mp4`,
    duration: "N/A",
    tags: ["Concept Project", "Coming Soon"],
    isFeatured: false,
    sortOrder: 6
  },
  {
    id: "7",
    title: "Lead Follow-Up Automation Demo",
    slug: "lead-follow-up-automation-demo",
    category: "Automation Projects",
    industry: "Local Business",
    serviceType: "AI & Workflow Automation",
    description:
      "A sample automation workflow showing how leads can be captured, organized, and followed up through CRM and email/message automation.",
    thumbnailUrl: `${sampleCloudinaryBase}/image/upload/v1710000007/growthforge/automation-demo.jpg`,
    videoUrl: `${sampleCloudinaryBase}/video/upload/v1710000007/growthforge/automation-demo.mp4`,
    duration: "N/A",
    tags: ["Demo Edit", "Automation", "Sample Project"],
    isFeatured: true,
    sortOrder: 7
  },
  {
    id: "8",
    title: "Short-form Paid Ad Concept",
    slug: "short-form-ad-concept",
    category: "Short-form Ads",
    industry: "Online Shop",
    serviceType: "Paid Ads Creative",
    description:
      "A short-form ad concept built around a strong hook, product benefit, objection handling, and simple call-to-action.",
    thumbnailUrl: `${sampleCloudinaryBase}/image/upload/v1710000008/growthforge/short-form-ad.jpg`,
    videoUrl: `${sampleCloudinaryBase}/video/upload/v1710000008/growthforge/short-form-ad.mp4`,
    duration: "00:28",
    tags: ["Concept Project", "Demo Edit", "Paid Ads"],
    isFeatured: true,
    sortOrder: 8
  },
  {
    id: "9",
    title: "Security-Conscious Website Setup Concept",
    slug: "security-conscious-website-setup-concept",
    category: "Website Projects",
    industry: "Service Business",
    serviceType: "Website Security & Maintenance",
    description:
      "A practical setup concept covering secure form handling, spam protection, update planning, SSL guidance, and backup-readiness for business websites.",
    thumbnailUrl: `${sampleCloudinaryBase}/image/upload/v1710000009/growthforge/security-website-concept.jpg`,
    videoUrl: `${sampleCloudinaryBase}/video/upload/v1710000009/growthforge/security-website-concept.mp4`,
    duration: "N/A",
    tags: ["Concept Project", "Coming Soon", "Security"],
    isFeatured: false,
    sortOrder: 9
  }
];

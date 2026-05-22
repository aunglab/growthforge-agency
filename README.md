# GrowthForge Agency Website

Production-ready full-stack digital marketing agency website built with Next.js App Router.  
Positioning: **"We help businesses grow with marketing, websites, automation, and secure digital systems."**

## 1) Project Overview

This project is a premium, responsive agency website for lead generation and portfolio showcasing.  
It includes:

- Conversion-focused homepage
- Video portfolio and sample work page
- Backend-powered contact form API
- PostgreSQL + Prisma lead storage
- Resend lead notification support
- Cloudinary-based video hosting approach
- Security-conscious configuration and headers

## 2) Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Reusable UI components inspired by shadcn/ui patterns
- lucide-react icons
- Prisma ORM
- PostgreSQL
- Zod validation
- Resend (email notifications)
- Cloudinary (video hosting/CDN)

## 3) Features

- Responsive premium homepage with:
  - Hero + dashboard visual
  - Trust bar
  - Services
  - Future-ready positioning
  - Who we help
  - Process
  - Portfolio preview
  - Why choose us
  - About
  - Pricing
  - Testimonials (placeholder)
  - FAQ
  - Contact section
- `/work` page with:
  - Category filters
  - Portfolio grid
  - Load more
  - Video modal (loads video only after click)
- `/admin` placeholder page
- `/api/contact` route with:
  - POST handling
  - Zod validation
  - Honeypot bot field check
  - Prisma database save
  - Resend notification email (optional if env configured)

## 4) How to Install

```bash
npm install
```

## 5) How to Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 6) PostgreSQL Setup

1. Create a PostgreSQL database.
2. Copy `.env.example` to `.env`.
3. Set `DATABASE_URL` in `.env`:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
```

## 7) Prisma Setup

Generate Prisma client:

```bash
npx prisma generate
```

## 8) Run Migrations

```bash
npx prisma migrate dev
```

This creates the `Lead` and `VideoProject` tables.

## 9) Resend Setup

In `.env`:

```env
RESEND_API_KEY=your_resend_api_key
LEAD_NOTIFICATION_EMAIL=your_notification_email@example.com
```

Contact submissions are saved to DB first.  
If email fails after DB save, the API still returns a safe success message.

## 10) Cloudinary Video Hosting (How It Works)

Video files should be hosted in Cloudinary and referenced by URL in portfolio data.

- Store thumbnails as `thumbnailUrl`
- Store playable video URLs as `videoUrl`
- Optional Cloudinary metadata can later be stored in Prisma (`cloudinaryPublicId`)

## 11) Why Videos Should Not Be Stored in This Project Folder

- Keeps repo lightweight and fast
- Avoids large Git history and deployment bloat
- Improves performance via CDN delivery
- Easier replacement and scaling of portfolio assets

## 12) Manual Cloudinary Upload (Version 1)

1. Upload videos/thumbnails in Cloudinary dashboard.
2. Copy secure URLs.
3. Update portfolio data entries in `lib/data/portfolio.ts`.

No public user video upload is implemented in version 1.

## 13) Replace `thumbnailUrl` and `videoUrl`

Edit:

- `lib/data/portfolio.ts`

For each item, replace:

- `thumbnailUrl`
- `videoUrl`

with your actual Cloudinary URLs.

## 14) Add More Video Projects

Add new objects to the `portfolioProjects` array in:

- `lib/data/portfolio.ts`

The UI (`/work` page and homepage preview) will update automatically.

## 15) Deploy to Vercel

1. Push code to Git provider (GitHub/GitLab/Bitbucket).
2. Import project into Vercel.
3. Add environment variables from `.env.example` in Vercel settings.
4. Run production build:

```bash
npm run build
```

5. Ensure production `DATABASE_URL` points to managed PostgreSQL.
6. Run Prisma migration in your deployment workflow.

## 16) Security Notes

- This is a **full-stack Next.js app** using server-side route handlers.
- Do not put secrets in frontend code.
- Environment variables prefixed with `NEXT_PUBLIC_` are visible to users.
- Keep secrets (`RESEND_API_KEY`, `CLOUDINARY_API_SECRET`) server-side only.
- Use HTTPS in production.
- Keep dependencies updated.
- Review security headers/CSP after adding third-party scripts.
- Add proper rate limiting before scaling traffic.
- Add authentication and authorization before building a real admin dashboard.
- Do not allow public video uploads.
- Rotate secrets immediately if they are ever exposed.
- Contact form includes frontend + backend validation and honeypot bot check.

### Rate Limiting Guidance

Before scale, add IP/user-agent based rate limiting for `/api/contact` (Redis or edge middleware), and monitor abuse patterns.

## 17) Future Improvements

- Protected admin dashboard
- Lead management CRM workflow
- Blog/CMS
- Booking system
- Client portal
- Secure Cloudinary upload from admin-only area
- n8n automation integration
- Email follow-up automation
- Analytics dashboard
- Role-based access control

## Useful Commands

```bash
npm install
npm run dev
npx prisma generate
npx prisma migrate dev
npm run build
```

## Admin Placeholder Notes

Current `/admin` is intentionally a placeholder.  
Future admin will support:

- Viewing leads
- Changing lead status
- Adding new video projects
- Editing video metadata
- Marking videos as featured
- Changing sort order
- Hiding/showing projects
- Secure Cloudinary uploads from protected admin only

## Future Admin Dashboard Plan

The project is intentionally structured so admin capabilities can be added without rewriting the
public website.

### Planned Admin Scope

- Login/authentication
- Authorization (admin role checks)
- View leads
- Change lead status
- Search and filter leads
- View lead details
- Add/edit/delete portfolio projects
- Mark projects as featured
- Secure Cloudinary uploads from admin-only area
- Manage testimonials
- Manage FAQs
- Manage blog posts
- View basic analytics

### Important Security Requirement

Authentication and authorization must be fully implemented **before** exposing private lead data or
admin mutation routes.

### Current Foundation Already Added

- `lib/admin/types.ts` for shared admin-facing domain types.
- `lib/server/admin/contracts.ts` for future repository/auth contracts.
- `/admin` remains a non-functional placeholder page with no private data exposure.

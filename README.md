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
- Protected `/admin` dashboard with login session
- Portfolio project add/edit/delete UI in admin
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

For private admin access, also set:

```env
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD=your_strong_password
ADMIN_SESSION_SECRET=a_long_random_secret_value
```

Contact submissions are saved to DB first.  
If email fails after DB save, the API still returns a safe success message.

## 10) Video Hosting (Cloudinary or YouTube)

Video files can be hosted in Cloudinary **or** YouTube and referenced in your `VideoProject` table.

- Store thumbnails as `thumbnailUrl`
- Store playable video URLs as `videoUrl` (direct MP4 URL or YouTube URL)
- Optional Cloudinary metadata can later be stored in Prisma (`cloudinaryPublicId`)

## 11) Why Videos Should Not Be Stored in This Project Folder

- Keeps repo lightweight and fast
- Avoids large Git history and deployment bloat
- Improves performance via CDN delivery
- Easier replacement and scaling of portfolio assets

## 12) Manual Upload (Version 1)

Cloudinary flow:
1. Upload videos/thumbnails in Cloudinary dashboard.
2. Copy secure URLs.
3. Add or update rows in Neon table `VideoProject` with those URLs.

YouTube flow:
1. Upload videos to YouTube as **Unlisted**.
2. Copy the YouTube watch/share URL and use it for `videoUrl`.
3. Use a thumbnail URL (`thumbnailUrl`) from your own image or YouTube thumbnail.

No public user video upload is implemented in version 1.

## 13) Replace `thumbnailUrl` and `videoUrl`

Open Neon -> Tables -> `VideoProject`, then edit:

- `thumbnailUrl`
- `videoUrl`

Your `/work` page and homepage portfolio preview will update automatically after deploy.

## 14) Add More Video Projects

Add a new row to Neon table `VideoProject` with:

- `title` (text)
- `slug` (unique text)
- `category` (use one of: Short-form Ads, Restaurant Videos, Real Estate Videos, Product Videos, Personal Brand Videos, Before / After Edits, Website Projects, Automation Projects)
- `industry` (optional)
- `serviceType`
- `description`
- `thumbnailUrl` (Cloudinary, YouTube thumbnail, or other public image URL)
- `videoUrl` (direct MP4 URL or YouTube URL)
- `cloudinaryPublicId` (optional)
- `duration` (optional, e.g. `00:35`)
- `tags` (text array, e.g. `{"Sample Project","Demo Edit"}`)
- `isFeatured` (`true` or `false`)
- `sortOrder` (number)

The UI (`/work` and homepage portfolio preview) reads from DB automatically.  
If DB has no portfolio rows yet, the app safely falls back to local sample data.

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
- Admin dashboard routes are protected by signed httpOnly session cookies.
- Use a long random `ADMIN_SESSION_SECRET` and strong `ADMIN_PASSWORD`.
- Do not allow public video uploads.
- Rotate secrets immediately if they are ever exposed.
- Contact form includes frontend + backend validation and honeypot bot check.

### Rate Limiting Guidance

Before scale, add IP/user-agent based rate limiting for `/api/contact` (Redis or edge middleware), and monitor abuse patterns.

## 17) Future Improvements

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

## Admin Dashboard Notes

Current `/admin` supports:

- Login session via `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`
- Add/edit/delete portfolio projects in UI
- Featured toggle and sort order control
- Protected admin API routes under `/api/admin/*`

Planned next expansions:

- Lead inbox and status updates
- Secure Cloudinary uploads directly from admin
- Content modules (testimonials/FAQ/blog)
- Multi-user roles and permissions

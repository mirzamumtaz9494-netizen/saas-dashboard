# Detailed Documentation - StayManager

## 1. Introduction
Thank you for purchasing StayManager! This documentation serves as a deeper technical dive into the architecture of the dashboard.

## 2. Global State & Providers
This template relies on lightweight React Context to simulate real-world SaaS environments. 
- **`TenantProvider.tsx`**: Located in `/providers/`. This simulates a multi-tenant environment. It holds the active `role` (Manager, Front Desk, Housekeeping) which the UI checks to hide/show certain navigation links and settings tabs.

## 3. UI Component Architecture
We rely on a decoupled component architecture. Standard elements (Buttons, Inputs, Badges) are located in `components/ui/`. 
- **Modals & Drawers**: Instead of relying on heavy third-party modal libraries, we use native React state intertwined with Tailwind's absolute/fixed positioning and CSS transitions. See `components/ui/Feedback.tsx`.

## 4. Deploying to Production
Because StayManager is built on Next.js, deploying is effortless. We highly recommend using Vercel.
1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Log into Vercel and select "Add New Project".
3. Import your repository. 
4. Click Deploy. Vercel automatically detects Next.js and configures the build settings (`npm run build`).

## 5. Connecting a Real Database
To graduate this template into a full-stack app:
1. Delete the imports from `lib/mock-data/index.ts`.
2. Swap the React `useEffect` data fetching loops with Server Components fetching data from Prisma, Supabase, Firebase, or your own REST API.
3. Replace the `onClick` event handlers (like deleting a guest or resolving a ticket) with Next.js Server Actions or API route (`fetch`) calls.

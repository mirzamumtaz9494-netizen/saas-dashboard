# Vprofessionals - Premium Hospitality SaaS Dashboard Template

Vprofessionals is a production-ready, premium frontend template built for hospitality management systems, hotel operations, and travel agencies. 

## Features
- **Next.js App Router** (React 19)
- **TypeScript** for robust development
- **Tailwind CSS v4** with native CSS variables for easy theming
- **Radix UI** for accessible headless components
- **Recharts** for beautiful data visualization
- **Light/Dark Mode** out of the box
- Responsive on all devices
- WCAG-oriented accessibility features
- SEO-ready layout structure

## Included Pages
1. Landing Page
2. Pricing
3. Login
4. Sign Up
5. Forgot Password
6. Dashboard Overview
7. Analytics
8. Bookings
9. Reservations, Guests, Properties, Rooms, Transactions, Reports, Notifications, Profile, Settings (UI Scaffolded)

## Getting Started

First, install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customization

### Theme Colors
To change the template colors, simply edit the CSS variables in `app/globals.css`. 

```css
@theme {
  --color-primary: #YOUR_HEX;
  /* ... */
}
```

### Fonts
Fonts are configured in `app/layout.tsx`. To change them, import new fonts from `next/font/google` and update the `className` on the body tag.

### Brand Name & Info
Update the `config/site.ts` file to easily change the brand name, contact info, and links globally across the template.

## Marketplace Packaging
For Envato/ThemeForest submission, package the following directories and files:
- `app/`
- `components/`
- `config/`
- `lib/`
- `public/`
- `package.json`
- `tsconfig.json`
- `next.config.ts`
- `tailwind.config` / `globals.css` (Tailwind 4)
- `README.md`

**DO NOT INCLUDE:**
- `node_modules/`
- `.next/`
- `.env.local`

## Notes for Buyers
This is a frontend-only template. All forms and authentication elements are UI-only and need to be wired up to your backend of choice (e.g., Supabase, Firebase, Node.js).

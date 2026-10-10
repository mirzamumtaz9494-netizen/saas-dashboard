# StayManager - Premium Next.js Hotel Dashboard Template

Welcome to **StayManager**! A meticulously crafted, modern, and highly responsive Admin Dashboard Template built for the hospitality industry. Perfect for Hotel SaaS platforms, Boutique Hotel Managers, and Property Management Systems (PMS).

## 🚀 Built With Modern Web Technologies
*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Turbopack ready)
*   **Library:** [React](https://react.dev/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Charts:** [Recharts](https://recharts.org/)
*   **Dates:** [date-fns](https://date-fns.org/)

## 📦 What's Included
*   **15+ Pre-built Pages:** Front Desk, Bookings, Room Inventory, Rates & Availability, Billing & Invoices, Real-time Reports, System Settings, Integrations, and more.
*   **Role-Based Access (RBAC):** Mock implementation for Managers, Front Desk, and Housekeeping roles.
*   **Dynamic Layouts:** Collapsible sidebars, drawer panels, and modular modals.
*   **Light/Dark Mode:** Built-in Tailwind dark mode support.
*   **100% Responsive:** Flawless rendering on mobile, tablet, and desktop displays.

---

## 🛠️ Quick Start Guide

### 1. Prerequisites
Ensure you have Node.js installed (v18.0.0 or higher is recommended). 

### 2. Installation
Extract the zip file, open your terminal, navigate to the project directory, and run:
```bash
npm install
# or
yarn install
# or 
pnpm install
```

### 3. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. The application will hot-reload as you make changes.

### 4. Production Build
To test the production build locally (which ensures there are no TypeScript or Linting errors):
```bash
npm run build
npm run start
```

---

## 🎨 Customizing the Template

### Changing the Brand Colors
StayManager uses Tailwind CSS CSS variables for easy theming. You can modify the primary brand color globally:
1. Open `app/globals.css`.
2. Locate the `:root` and `.dark` variables.
3. Change the `--primary`, `--brand-gold`, and `--brand-black` hex or HSL values.

### Modifying Mock Data
Since this is a front-end template, the data is driven by local mock files to demonstrate UI states.
* Navigate to `lib/mock-data/index.ts`.
* Here you can edit users, guests, tickets, bookings, and financial metrics.

---

## 📁 File Structure
```text
├── app/                  # Next.js App Router (Pages & API Routes)
│   ├── dashboard/        # Dashboard layout and modular pages
│   ├── globals.css       # Global CSS and Tailwind directives
│   └── layout.tsx        # Root HTML layout
├── components/           # Reusable UI components
│   ├── layout/           # Sidebar, Header, and Navigation
│   ├── ui/               # Buttons, Inputs, Badges, Feedback modals
│   └── sections/         # Landing page marketing sections
├── config/               # Tenant and navigation configurations
├── lib/                  # Utilities and mock data
│   ├── formatters.ts     # Currency and date helpers
│   ├── metrics.ts        # RevPAR, ADR, and Occupancy calculations
│   └── mock-data/        # Centralized dummy data for the template
└── public/               # Static assets (SVGs, icons)
```

## 📝 Licensing & Credits
Please refer to the `LICENSE.txt` and `CREDITS.md` files included in this repository for licensing terms and open-source attribution.

---
**Thank you for choosing StayManager!** 
If you build something amazing with this template, we'd love to see it!

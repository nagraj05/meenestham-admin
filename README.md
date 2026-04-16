<div align="center">
  <img src="public/logos/logo-mobile.png" alt="Mee Nestham Logo" width="72" />
  <h1>MEE NESTHAM Admin</h1>
  <p>Internal admin portal for onboarding and managing clients · Built by <strong>OTSI</strong></p>

  ![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
  ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss)
</div>

---

## Overview

Mee Nestham Admin is a Next.js admin dashboard for onboarding clients. It provides a multi-step tabbed form with real-time Zod validation, error tracking per tab, and toast notifications — designed for internal operations teams.

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | shadcn/ui · Radix UI · Tailwind CSS v4 |
| Forms | React Hook Form · Zod |
| Icons | Lucide React |
| Notifications | Sonner |
| Font | Plus Jakarta Sans · JetBrains Mono |

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

## Project Structure

```
app/
├── layout.tsx                  # Root layout — fonts, Toaster
├── globals.css                 # Tailwind v4 theme tokens (CSS variables)
└── onboard/
    ├── page.tsx                # Form orchestrator — state, submit, tab wiring
    ├── schema.ts               # Zod schema, types, default values
    ├── config.ts               # Tab definitions, error counting logic
    └── _components/
        ├── field.tsx           # Field, PanelHeader, shared input class strings
        ├── header.tsx          # Sticky top bar with logo and error count
        ├── footer.tsx          # Prev/Next navigation, step dots, Submit button
        └── tabs/
            ├── client-config.tsx
            ├── location.tsx
            ├── palette.tsx
            ├── pgrs.tsx
            └── user-account.tsx

components/
└── ui/                         # shadcn/ui components (button, input, label, tabs, sonner)

lib/
└── utils.ts                    # cn() — clsx + tailwind-merge helper

public/
└── logos/
    └── logo-mobile.png         # Brand logo (used in header + browser tab)
```

## Onboard Form

The `/onboard` route is a single-page multi-tab form that collects all data needed to onboard a new client. On submit it produces a JSON payload ready for the backend API.

### Tabs

| # | Tab | Fields |
|---|---|---|
| 1 | **Client Config** | S Client Key, T Client Key, Constituency Name, AC Key, Client SC, Theme |
| 2 | **Location** | State Key, State, ECAC Key |
| 3 | **Color Palette** | secondary, secondarylight, secondarycontrasttext, warningmain, warningcontrasttext, errormain |
| 4 | **PGRS** | User ID, Password, Source ID, Office ID, Created By, Push |
| 5 | **User Account** | User Key, Email, Full Name, Contact, Password |

### Validation

- Validated with **Zod** on every change (`mode: "onChange"`)
- Hex color fields enforce `#RRGGBB` format
- Contact must be exactly 10 digits
- Password minimum 8 characters
- Error badge on each tab shows live field count
- On failed submit → toast fires and form jumps to the first tab with errors

### Wiring the API

Find the `onSubmit` handler in `app/onboard/page.tsx` and replace the `console.log` with your `fetch` / axios call:

```ts
function onSubmit(data: OnboardFormValues) {
  await fetch("/api/onboard", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
```

## Adding shadcn Components

```bash
npx shadcn add <component-name>
```

Components are placed in `components/ui/`. Configuration lives in `components.json` (style: `radix-nova`, base color: `neutral`).

## Theming

All design tokens are CSS variables defined in `app/globals.css` under `:root` (light) and `.dark` (dark mode). Tailwind v4 maps them via `@theme inline` — there is no `tailwind.config` file.

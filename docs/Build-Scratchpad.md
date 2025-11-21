# The Bazaar Build Scratchpad

Trackable checklist mirroring the agreed implementation plan. Update these
checkboxes as work progresses—no code lives here, so it is safe to modify at any
time.

---

## Phase 0 – Shared Monorepo & Platform Foundations

### Phase 0.1 – Monorepo & Environment Setup

- [x] **Task 0.1.1** – Initialize monorepo (Nx/Turborepo, linting, formatting, hooks)
- [x] **Task 0.1.2** – Create core Next.js app shells with PWA scaffolding
- [x] **Task 0.1.3** – Scaffold shared packages (`ui`, `schemas`, `api`, `utils`)
- [x] **Task 0.1.4** – Integrate Tailwind + shadcn UI with blue brand kit (`#35598f`)

### Phase 0.2 – Core Backend & Data Layer

- [x] **Task 0.2.1** – Prisma schema + migrations (`User`, `Vendor`, `Admin`, `Product`,
      `Category`, `Order`, `OrderItem`, `Payment`, `Payout`, `Review`, `Storefront`,
      `Notification`, `SupportTicket`, `AuditLog`, `Chat`, `Message`)
- [x] **Task 0.2.2** – Auth & roles (Supabase Auth wiring, RLS utilities)
- [x] **Task 0.2.3** – API layer (tRPC/REST contracts, Fastify/Next handlers)

### Phase 0.3 – Integrations, CI/CD & Observability

- [x] **Task 0.3.1** – Integration scaffolding (Stripe, Pesapal/M-Pesa, DHL/Sendy,
      Resend, Sentry, GA4/PostHog, Supabase Storage clients)
- [x] **Task 0.3.2** – CI/CD pipelines (GitHub Actions, Vercel/AWS deploy flow)
- [x] **Task 0.3.3** – Cross-cutting concerns (structured logging, notifications,
      correlation IDs)

---

## Main App (Shopper Portal)

### Phase M1 – Shell, Routing, Auth

- [ ] **M1.1** – Layout & navigation per `Main-App-Sitemap`
- [ ] **M1.2** – Authentication & onboarding (Supabase Auth, profile completion)
- [ ] **M1.3** – Global state & data fetching (React Query/Zustand hooks)

### Phase M2 – Discovery & Catalog

- [ ] **M2.1** – Homepage hero, featured, promos, search entry
- [ ] **M2.2** – Search + faceted filters (category, price, vendor rating, stock)
- [ ] **M2.3** – Product detail pages (gallery, variants, vendor info, wishlist)

### Phase M3 – Cart, Checkout, Payments

- [ ] **M3.1** – Cart state (session persistence, edge cases)
- [ ] **M3.2** – Checkout flow (shipping address/method, review)
- [ ] **M3.3** – Payment integrations (Stripe + Pesapal/M-Pesa, escrow, webhooks)

### Phase M4 – Orders, Post-Purchase, Accounts

- [ ] **M4.1** – Order lifecycle tracking & notifications
- [ ] **M4.2** – Reviews, refunds, disputes handling
- [ ] **M4.3** – Account dashboard (profile, addresses, wallet)

### Phase M5 – Performance, PWA, Analytics, Launch

- [ ] **M5.1** – PWA/offline optimizations
- [ ] **M5.2** – Analytics & monitoring instrumentation
- [ ] **M5.3** – QA, UAT, go-live hardening

---

## Vendor Portal

### Phase V1 – Auth, Onboarding, Workspace

- [ ] **V1.1** – Vendor auth & role gating
- [ ] **V1.2** – KYC/KYB onboarding flow
- [ ] **V1.3** – Dashboard shell + initial widgets/modules

### Phase V2 – Product & Inventory Management

- [ ] **V2.1** – Product listing CRUD with Supabase Storage uploads
- [ ] **V2.2** – Bulk operations & compliance validation
- [ ] **V2.3** – Inventory & pricing controls with low-stock alerts

### Phase V3 – Orders & Fulfillment

- [ ] **V3.1** – Order lists/detail views
- [ ] **V3.2** – Status workflow + shopper notifications
- [ ] **V3.3** – Logistics integrations (DHL/FedEx/Sendy self vs Bazaar fulfilled)

### Phase V4 – Financials & Analytics

- [ ] **V4.1** – Financial dashboard (earnings, commissions, payouts)
- [ ] **V4.2** – Payout requests + statements
- [ ] **V4.3** – Analytics & growth KPIs

### Phase V5 – Communication, Support, Hardening

- [ ] **V5.1** – Messaging/support center (in-app chat threads per order)
- [ ] **V5.2** – Notification center + help content
- [ ] **V5.3** – QA, UAT, launch readiness

---

## Admin Portal

### Phase A1 – Auth, Roles, Dashboard Shell

- [ ] **A1.1** – Secure admin auth (MFA, device fingerprinting)
- [ ] **A1.2** – Dashboard layout + global KPIs/alerts

### Phase A2 – Vendor & User Management

- [ ] **A2.1** – Vendor onboarding/approval tooling
- [ ] **A2.2** – Vendor monitoring & enforcement actions
- [ ] **A2.3** – Shopper account management tools

### Phase A3 – Product, Orders, Financial Oversight

- [ ] **A3.1** – Product moderation workflows
- [ ] **A3.2** – Order pipeline + dispute intervention tools
- [ ] **A3.3** – Financial operations (payout validation, reports)

### Phase A4 – Analytics, Reporting, Config

- [ ] **A4.1** – Reporting & export suite
- [ ] **A4.2** – System configuration UI (commissions, gateways, shipping, templates)
- [ ] **A4.3** – Security/logs/audit UI

### Phase A5 – Support, Campaigns, Launch

- [ ] **A5.1** – Support ticket desk (categorization, SLAs)
- [ ] **A5.2** – Campaigns & merchandising controls
- [ ] **A5.3** – QA, UAT, go-live

---

## Cross-Portal & Realtime Communication

- [ ] **Realtime Chat MVP** – Implement shared `Chat` + `Message` services, WebSocket
      subscriptions, order-linked threads for shoppers↔vendors, admins↔vendors.
- [ ] **In-App Voice/Call Foundations** – Define requirements + future plan (WebRTC
      scaffolding) while keeping Phase 1 scope limited to chat; document dependency for
      post-MVP enablement.
- [ ] **Phase Sequencing Tracking** – Weeks 1–8 cadence (Phase 0 through launch).

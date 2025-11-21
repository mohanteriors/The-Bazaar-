# The Bazaar - Comprehensive Build Plan

**Document Version:** 1.0  
**Date:** November 22, 2025  
**Author:** Manus AI

---

## 1. Introduction

This document outlines the detailed build and implementation plan for The Bazaar multi-portal e-commerce platform. It translates the strategic objectives from the **Master PRD** [1] and the technical guidelines from the **Knowledge Base** [2] into an actionable sequence of development tasks, derived from the initial **Build Scratchpad** [3].

Our primary goal is to deliver a robust, scalable, and secure Minimum Viable Product (MVP) within the specified 18-week timeline. This plan is structured into logical phases, each containing a set of granular tasks with defined objectives and dependencies.

## 2. Phased Implementation Strategy

The project is divided into four primary streams, executed in parallel after the foundational phase:

1.  **Phase 0: Platform Foundations:** Establishes the monorepo, core backend, data layer, and CI/CD pipelines.
2.  **Main App (Shopper Portal):** Focuses on the customer-facing e-commerce experience.
3.  **Vendor Portal:** Builds the dashboard for vendors to manage their business.
4.  **Admin Portal:** Creates the tools for platform oversight and administration.

### Phase 0: Shared Monorepo & Platform Foundations

This is the critical first phase to establish the technical backbone of the entire platform.

| Task ID | Task Description | Dependencies | Key Technologies |
| :--- | :--- | :--- | :--- |
| **0.1.1** | **Initialize Monorepo:** Set up Nx monorepo with integrated linting (ESLint), formatting (Prettier), and Git hooks. | - | Nx, TypeScript, ESLint |
| **0.1.2** | **Create App Shells:** Scaffold core Next.js app shells for the three portals (Main, Vendor, Admin) with PWA manifests. | 0.1.1 | Next.js, PWA |
| **0.1.3** | **Scaffold Shared Packages:** Create shared internal packages for `ui`, `schemas` (Zod), `api` (tRPC), and `utils`. | 0.1.1 | TypeScript, Zod, tRPC |
| **0.1.4** | **Integrate UI Kit:** Integrate Tailwind CSS and shadcn/ui. Theme the UI kit using the brand colors from the **Brand Kit** [4]. | 0.1.2, 0.1.3 | Tailwind CSS, shadcn/ui |
| **0.2.1** | **Define Prisma Schema:** Implement the full database schema in Prisma, including all models listed in the Knowledge Base. Generate initial migrations. | - | Prisma, PostgreSQL |
| **0.2.2**| **Implement Auth & Roles:** Wire up Supabase Auth, create utility functions for Role-Based Access Control (RBAC), and implement Row-Level Security (RLS) policies. | 0.2.1 | Supabase Auth, PostgreSQL RLS |
| **0.2.3** | **Establish API Layer:** Define initial tRPC/REST API contracts and set up handlers using Next.js API routes or Fastify. | 0.1.3, 0.2.2 | tRPC, Next.js API Routes |
| **0.3.1** | **Scaffold Integrations:** Create client scaffolding for all key third-party services (Stripe, Pesapal, DHL, Resend, Sentry, Supabase Storage). | 0.1.3 | TypeScript, SDKs |
| **0.3.2** | **Configure CI/CD Pipelines:** Set up GitHub Actions for automated testing, and create deployment workflows to Vercel/AWS. | 0.1.1 | GitHub Actions, Vercel |
| **0.3.3** | **Implement Cross-Cutting Concerns:** Integrate structured logging (Sentry), a core notifications service, and correlation IDs for traceability. | 0.2.3 | Sentry, TypeScript |

### Main App (Shopper Portal) Development

| Task ID | Task Description | Dependencies | Key Technologies |
| :--- | :--- | :--- | :--- |
| **M1.1** | **Layout & Navigation:** Implement the main app shell, routing, and navigation based on the `Main-App-Sitemap.md` [5]. | 0.1.4 | Next.js (App Router), React |
| **M1.2** | **Authentication & Onboarding:** Build the sign-up, login, and profile completion flows using Supabase Auth. | 0.2.2 | Supabase Auth, React |
| **M2.1** | **Homepage & Discovery:** Develop the homepage with hero, featured products, and promotional sections. | M1.1 | React, Tailwind CSS |
| **M2.2** | **Search & Filtering:** Implement product search with faceted filters (category, price, rating). | 0.2.3 | React, Zustand/React Query |
| **M2.3** | **Product Detail Pages:** Create the Product Detail Page (PDP) with image gallery, variant selection, and vendor information. | M2.2 | React |
| **M3.1** | **Shopping Cart:** Implement cart state management with session persistence. | M2.3 | Zustand, LocalStorage |
| **M3.2** | **Checkout Flow:** Build the multi-step checkout process (shipping, review). | M3.1 | React, Stripe Elements |
| **M3.3** | **Payment Integrations:** Integrate Stripe and Pesapal/M-Pesa for payment processing, including webhook handling. | 0.3.1, M3.2 | Stripe API, Pesapal API |
| **M4.1** | **Order Lifecycle:** Develop order tracking and notification features. | M3.3 | React, Resend |
| **M4.2** | **Post-Purchase:** Implement UI for reviews, refunds, and disputes. | M4.1 | React |
| **M4.3** | **Account Dashboard:** Build the user account dashboard. | M1.2 | React |
| **M5.1** | **PWA & Offline:** Optimize for PWA installation and offline capabilities. | All Main App | Workbox, Next-PWA |

### Vendor Portal Development

| Task ID | Task Description | Dependencies | Key Technologies |
| :--- | :--- | :--- | :--- |
| **V1.1** | **Vendor Auth & Gating:** Implement vendor-specific authentication and role-gated access. | 0.2.2 | Supabase Auth, React |
| **V1.2** | **KYC/KYB Onboarding:** Build the Know Your Customer/Business onboarding flow with document uploads. | V1.1, 0.3.1 | React, Supabase Storage |
| **V2.1** | **Product Management (CRUD):** Develop the full CRUD interface for product listings. | V1.2 | React, Supabase Storage |
| **V2.3** | **Inventory & Pricing:** Build tools for managing inventory and pricing, with low-stock alerts. | V2.1 | React, tRPC |
| **V3.1** | **Order Management:** Create order list and detail views for vendors. | V2.3 | React, tRPC |
| **V3.2** | **Fulfillment Workflow:** Implement the order status workflow (e.g., Packed, Shipped) with shopper notifications. | V3.1 | React, Resend |
| **V4.1** | **Financial Dashboard:** Develop a dashboard to show earnings, commissions, and payouts. | V3.2 | React, Chart.js/Recharts |
| **V5.1** | **Messaging Center:** Implement the in-app chat system for order-related communication. | 0.2.3 | React, Supabase Realtime |

### Admin Portal Development

| Task ID | Task Description | Dependencies | Key Technologies |
| :--- | :--- | :--- | :--- |
| **A1.1** | **Secure Admin Auth:** Implement secure admin login with MFA. | 0.2.2 | Supabase Auth |
| **A2.1** | **Vendor Approval Tooling:** Build the interface for admins to review and approve/reject vendor applications. | V1.2 | React, tRPC |
| **A2.2** | **Vendor Monitoring:** Create tools for monitoring vendor performance and taking enforcement actions. | A2.1 | React |
| **A3.1** | **Product Moderation:** Develop workflows for moderating product listings. | V2.1 | React |
| **A3.2** | **Dispute Intervention:** Build tools for admins to intervene in and resolve shopper-vendor disputes. | M4.2 | React |
| **A3.3** | **Financial Oversight:** Create interfaces for validating payouts and generating financial reports. | V4.1 | React |
| **A4.1**| **Reporting Suite:** Develop a suite for generating and exporting system reports. | A3.3 | React, PapaParse/xlsx |
| **A4.2** | **System Configuration:** Build a UI for managing system settings (e.g., commissions, payment gateways). | 0.2.3 | React |
| **A5.1** | **Support Ticket Desk:** Implement a simple help desk for managing support tickets. | M4.2 | React |

---

## 3. References

[1]: /home/ubuntu/the-bazaar/docs/Master-PRD.md (The Bazaar - Master Product Requirements Document)
[2]: /home/ubuntu/the-bazaar/docs/Knowledge-Base.md (The Bazaar — Internal Knowledge Base & Engineering Reference)
[3]: /home/ubuntu/the-bazaar/docs/Build-Scratchpad.md (The Bazaar Build Scratchpad)
[4]: /home/ubuntu/the-bazaar/docs/Brand-Kit.md (The Bazaar - Brand Kit)
[5]: /home/ubuntu/the-bazaar/docs/Main-App-Sitemap.md (The Bazaar - Main App Sitemap)

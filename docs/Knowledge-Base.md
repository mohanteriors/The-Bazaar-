Knowledge-Base.md
The Bazaar — Internal Knowledge Base & Engineering Reference
1. Introduction

This Knowledge Base centralizes all essential information required for the planning, development, testing, governance, and long-term maintenance of The Bazaar, a multi-portal e-commerce ecosystem consisting of:

Main App (Shopper Marketplace)

Vendor Portal (Vendor Dashboard & Business Operations)

Admin Portal (Platform Management & Compliance)

This document functions as the single internal reference hub for developers, designers, PMs, DevOps, QA, customer support, and founders.

2. Core System Overview
2.1 Architectural Summary

The Bazaar is a monorepo multi-portal architecture featuring:

Shared core modules

Authentication

Billing / Payments

Notifications

Utilities

Shared UI components

Three isolated applications
Each with its own routes, API handlers, and UI flows.

2.2 Tech Stack Summary (System Standard)

Framework: Next.js (App Router)

Backend: Next.js Server Actions + tRPC or REST

Database: PostgreSQL

ORM: Prisma

File Storage: Supabase Storage

Payments: M-Pesa, Stripe, PayPal, Pesapal

Email: Resend

UI: Tailwind + Shadcn UI

State Management: Zustand or React Query (per portal needs)

Deployment: Vercel for frontend, AWS for backend-heavy services

Logging: Sentry

Monitoring: Grafana / Vercel Analytics

All portals follow this baseline unless explicitly overridden.

3. Functional Overview
3.1 Main App (Shopper App)

Core function:
Product discovery, shopping experience, checkout, payments, tracking, dispute reporting.

Key features include:

Homepage curated feed

Category navigation

Product pages

Cart & checkout

Order management

Wishlist

Reviews & ratings

Vendor storefronts

3.2 Vendor Portal

Core function:
Business management for sellers.

Key features include:

Vendor onboarding & KYC

Product creation & catalog management

Orders dashboard

Inventory control

Promotions

Financial reporting

Withdrawals & payouts

Vendor dispute resolution

3.3 Admin Portal

Core function:
Control, compliance, and operations.

Key features include:

Vendor verification

Shopper management

Product approval

Fraud detection & monitoring

Refund & dispute control

Platform KPIs

Audit logs

Configurable settings

4. Data Models (High-Level)

Full schema is in the Master PRD. Below is the quick reference.

Core Models:

User

Vendor

Admin

Product

Category

Order

OrderItem

Payment

Payout

Review

Storefront

Notification

SupportTicket

AuditLog

Each model includes:

lifecycle rules

creation/update paths

permissions

integration touchpoints

This section allows developers to resolve ambiguity fast.

5. Permissions Framework
User Roles:

Shopper

Vendor

Admin

Super Admin

Access Map Quick View
Feature	Shopper	Vendor	Admin
Browse & Buy	✓	✓	✓
Manage Store	✗	✓	✗
Approve Vendors	✗	✗	✓
Initiate Refund	✓	✓	✓
Modify Products	✗	✓	✓
View Financial Reports	✗	✓	✓
Platform Config	✗	✗	Super Admin only

This chart prevents back-and-forth when designing API protection.

6. Workflows & System Logic
6.1 Payment Flow (Unified Across All Portals)

Shopper places order

Funds are held in escrow

Vendor receives “New Order” alert

Order is accepted, packed, and shipped

Shopper confirms delivery

Funds released to vendor

Platform takes commission

Payout is queued → settlement within defined cycle

Edge cases covered:

Delivery timeouts

Returned orders

Failed payments

Manual admin overrides

6.2 Vendor Onboarding Workflow

Vendor fills form

Identity validation

Business document upload

Risk score computed

Admin reviews

Approval or rejection

Storefront published

6.3 Dispute Flow

Shopper clicks “Report Issue”

Support ticket auto-created

Vendor notified

Admin reviews evidence

Temporary freeze applies to funds

Admin rules: refund / partial / vendor win

This workflow interacts with payments, orders, vendors, and notifications.

7. Core Integrations
Payments:

M-Pesa Daraja API

Stripe Checkout

Pesapal

PayPal (optional)

Logistics:

DHL

Sendy (Kenya)

FedEx

Emails:

Resend transactional templates

CDN & Storage:

Supabase Storage

Cloudflare CDN

Analytics:

PostHog event tracking

Vercel Analytics

Google Analytics (optional)

8. Testing Framework
Test types expected in this ecosystem:

Unit Tests

Integration Tests

API Tests

Payment Simulation Tests

E2E Tests (Playwright)

Load Tests (k6 optional)

Mandatory Test Coverage:

Authentication flows

Vendor onboarding

Product lifecycle

Checkout + payment

Disputes

Admin approvals

Permissions & role handling

9. Coding Standards
Language Rules:

TypeScript only

ESLint + Prettier enforced

100% typed APIs

Absolute imports only

Use server actions conservatively

Folder Standards:

All apps follow a common pattern:

/app
  /routes
  /actions
  /components
  /lib
  /hooks
  /providers
  /types


Shared modules live in:

/packages
   /ui
   /utils
   /schemas
   /api

10. DevOps Reference
Environment Standards:

Each portal supports:

Local

Staging

Production

Env Variables Managed via:

.env.local for local

GitHub Secrets for staging & prod

Central Vault for rotation

Deployment Flow:

Developer pushes code to feature branch

PR → dev branch

CI runs tests

Auto-deploy to staging

Manual approval to production

11. Operational Policies
Error Handling:

All user-facing errors must be contextual and actionable.
Internal errors logged to Sentry with correlation IDs.

Content Moderation:

Admins can:

Hide products

Ban vendors

Lock accounts

View audit logs

Refund Rules:

Refunds require admin authorization unless automated heuristics trigger auto-refund (e.g., undelivered for 10 days).

Vendor Suspension Rules:

Inventory hidden

Storefront disabled

Payouts frozen

Pending orders flagged

12. Documentation Index

Linked documents included in your zip:

Master-PRD

Main-App-PRD

Vendor-Portal-PRD

Admin-Portal-PRD

All three sitemaps

All three flows

Brand Kit

Knowledge Base (this document)

This index functions as the “table of truth” for the entire monorepo.

13. Knowledge Base Directory Structure
/knowledge-base
   master-prd.md
   main-app-prd.md
   vendor-portal-prd.md
   admin-portal-prd.md
   main-app-sitemap.md
   vendor-portal-sitemap.md
   admin-portal-sitemap.md
   brand-kit.md
   knowledge-base.md
   shopper-flow.md
   vendor-flow.md
   admin-flow.md

14. Purpose of This Knowledge Base

This document ensures:

Engineers never guess system logic

Designers never improvise UX flows

Product teams never lose alignment

Dev tools (including Cursor) always have correct context

Future developers can onboard in hours, not weeks

It is the backbone of The Bazaar’s scaling strategy.
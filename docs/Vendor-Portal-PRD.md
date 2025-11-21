# The Bazaar - Vendor Portal Product Requirements Document (PRD)
**Document Version:** 1.0  
**Date Last Updated:** November 21, 2025  
**Portal:** Vendor Portal  
**Target Phase:** Phase 1 - Core MVP  

---

## I. Executive Summary
The Vendor Portal empowers Kenyan sellers to manage their store, products, orders, and payouts. It provides an intuitive dashboard for operational oversight, performance tracking, and communication with shoppers. The focus is on usability, transparency, and efficient business management.  

---

## II. Business Objectives & KPIs
- Enable vendors to list products and manage inventory efficiently  
- Track orders, mark fulfillment stages, and monitor payouts  
- Ensure vendor adoption and minimal support requests  

**KPIs:**
- 100% of onboarded vendors able to list a product within 24 hours of approval  
- Order fulfillment accuracy > 95%  
- Vendor dashboard load times < 2 seconds  

---

## III. Target Audience / Personas
- **Primary Users:** Small and medium Kenyan business owners, some new to e-commerce  
- **Technical Proficiency:** Beginner to intermediate users  

---

## IV. Scope
**In Scope:**
- Vendor authentication & onboarding  
- Product listing & inventory management  
- Order management & fulfillment  
- Financial dashboard (earnings, payouts, commissions)  
- Communication tools (customer & admin messaging)  

**Out of Scope (Phase 1):**
- Vendor loyalty programs  
- Advanced analytics beyond basic KPIs  
- Multi-store management (for single vendor accounts)  

---

## V. Features & Functional Requirements

### 5.1 Authentication & Onboarding
- Vendor registration & profile setup  
- Admin approval required for first login  
- Password reset & MFA  

### 5.2 Product Management
- Add, edit, delete products  
- Upload multiple images per product (Supabase Storage)  
- Manage variations (size, color)  
- Real-time inventory tracking & low-stock alerts  
- Bulk product uploads  

### 5.3 Order Management
- View incoming orders & order details  
- Update order status: Accepted → Packed → Shipped → Delivered  
- Refund and return management  
- Shipment tracking integration (DHL/FedEx/Sendy)  

### 5.4 Financials & Reporting
- Dashboard showing:
  - Total earnings  
  - Commission deductions  
  - Next payout schedule  
  - Transaction history  
- Multi-currency support (KES, USD, EUR)  
- Payouts via Stripe/Pesapal  

### 5.5 Communication & Support
- Internal messaging with customers  
- Alerts for new orders and low stock  
- Access to FAQs, tutorials, and admin support  

### 5.6 Analytics
- KPIs: conversion rates, fulfillment times, return rates  
- Simple charts and tables for quick insights  

---

## VI. Technical & System Requirements
- **Frontend:** Next.js + Tailwind CSS + PWA support  
- **Backend:** Supabase/PostgreSQL + Fastify for complex operations  
- **Security:** RLS for vendor-specific data, MFA for login  
- **Scalability:** AWS hosting, Cloudflare CDN, caching for performance  

---

## VII. Integrations
| Service | Purpose | Integration Point |
|---------|--------|-----------------|
| Supabase | Auth, DB, Storage | Frontend SDK & Edge Functions |
| Stripe | Payments / Payouts | Fastify backend |
| Pesapal | Local payments (M-Pesa) | Fastify backend |
| DHL/FedEx/Sendy | Shipping & tracking | API calls via backend |
| AWS SES | Email notifications | Fastify backend |

---

## VIII. UX & Design
- Mobile-first responsive design  
- Simple, clean dashboard with sidebar navigation  
- Dashboard widgets for real-time updates  
- Brand colors and typography consistent with main app  
- Accessibility: WCAG 2.1 AA  

---

## IX. Milestones & Timeline (Vendor Portal)
| Milestone | Target Date |
|-----------|------------|
| Vendor Authentication & Onboarding | Week 1-2 |
| Product Management MVP | Week 3-4 |
| Order Management MVP | Week 5-6 |
| Financial Dashboard MVP | Week 7 |
| Communication & Notifications | Week 8 |
| Internal QA & UAT | Week 8 |
| Go-live MVP | Week 8 |

---

## X. KPIs & Success Metrics
- Vendors able to list a product within 1 hour post-login  
- Orders updated correctly > 95% of the time  
- Dashboard load times < 2 seconds  
- Low customer support tickets for simple tasks (<5% of orders)  


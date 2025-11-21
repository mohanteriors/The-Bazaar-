# The Bazaar - Master Product Requirements Document (PRD)
**Document Version:** 1.0  
**Date Last Updated:** November 21, 2025  
**Project Name:** The Bazaar  
**Target Phase:** Phase 1 - Core Platform MVP & Launch  

---

## I. Introduction & Project Scope

### 1.1 Executive Summary
The Bazaar is a multi-portal e-commerce platform connecting Kenyan vendors to global shoppers. It is designed as a Progressive Web App (PWA) for all portals (Shopper, Vendor, Admin) to allow mobile-first, offline-friendly experiences. Key differentiators include M-Pesa integration for local payments, vendor-customizable storefronts, and robust analytics for business insights.

### 1.2 Business Objectives & KPIs
- **Objective 1:** Launch MVP within 16 weeks  
  **KPI:** Go-live date  
- **Objective 2:** Onboard 50 approved Kenyan vendors  
  **KPI:** 50 active vendor accounts in the database 1 month post-launch  
- **Objective 3:** Process KES 500,000 in transaction volume  
  **KPI:** Total GMV 3 months post-launch  

### 1.3 Target Audience / Personas
- **Shoppers:** Worldwide, mobile-first, tech-savvy users looking for unique Kenyan products  
- **Vendors:** Kenyan small business owners, potentially new to e-commerce, require intuitive management tools  
- **Admins:** Internal team managing system health, vendor approvals, and support tickets  

### 1.4 Scope & Limitations
**In Scope (Phase 1):**
- Three portals (Shopper, Vendor, Admin) as PWAs  
- Supabase integration (Auth, DB, Storage)  
- Stripe & Pesapal payment gateways  

**Out of Scope (Future Phases):**
- Loyalty/rewards system  
- Advanced CRM integration  
- Native mobile apps  

---

## II. User Flows & Personas
- **User (Shopper) Flow:** Homepage → Browse → Add to Cart → Checkout → Order Tracking → Support  
- **Vendor Flow:** Registration → Admin Approval → Product Listing → Order Fulfillment → Payouts  
- **Admin Flow:** Login → Vendor Review/Approval → Platform Monitoring → Dispute Resolution  

---

## III. Features & Functionality (Per Portal)
### 3.1 Shopper Portal
- Product discovery with faceted search and filters  
- PWA installable and offline caching  
- Stripe & Pesapal checkout  
- Order tracking  

### 3.2 Vendor Portal
- Admin-approved login  
- Product management (CRUD) with inventory  
- Order management with push notifications  
- Finance dashboard with earnings and commission details  

### 3.3 Admin Portal
- Vendor management (approve/reject)  
- User management and dispute handling  
- System health monitoring, KPIs, and reporting  

---

## IV. Technical & System Requirements
- **Architecture:** Nx mono-repo, Fastify backend, PostgreSQL, Supabase  
- **Performance:** Page load < 2s, uptime > 99.9%  
- **Security:** RLS, PCI DSS for payments, MFA for accounts  
- **Scalability:** AWS EC2/S3, Docker/Kubernetes  

---

## V. Integrations & Dependencies
| Service  | Purpose | Integration Point |
|----------|--------|-----------------|
| Supabase | DB, Auth, Storage, Edge Functions | Frontend SDK & Backend |
| Stripe   | Global payments | Backend |
| Pesapal  | Kenyan local payments | Backend |
| DHL/FedEx| Shipping rates/labels | Backend API call |
| Sendy    | Local delivery | Backend API call |
| AWS SES  | Transactional emails | Backend API call |
| Cloudflare | CDN/Security | DNS Config |

---

## VI. Design & UX
- Wireframes in Figma (link placeholder)  
- Brand guidelines including typography, colors, logos  
- Accessibility: WCAG 2.1 AA  

---

## VII. Milestones & Timeline
| Milestone | Target Date |
|-----------|------------|
| Phase 0: Setup | Week 2 |
| Phase 1: Core MVP | Week 8 |
| Phase 2: Finance/Fulfillment | Week 12 |
| Phase 3: PWA/Localization | Week 16 |
| UAT & Bug Fixing | Week 17 |
| Go Live | Week 18 |

---

## VIII. Stakeholders & Approvals
| Name | Role | Approval Status |
|------|------|----------------|
| [Founder] | Product Owner | Pending |
| [Lead Dev] | Tech Lead | Pending |
| [Designer] | UX/UI Designer | Pending |


# The Bazaar - Admin Portal Product Requirements Document (PRD)
**Document Version:** 1.0  
**Date Last Updated:** November 21, 2025  
**Portal:** Admin Portal  
**Target Phase:** Phase 1 - Core MVP  

---

## I. Executive Summary
The Admin Portal provides marketplace administrators with comprehensive control over The Bazaar platform. It enables user and vendor management, order monitoring, system oversight, and analytics. The portal ensures operational efficiency, security, and smooth platform governance.  

---

## II. Business Objectives & KPIs
- Maintain platform integrity and reliability  
- Streamline vendor onboarding and approval process  
- Monitor transactions, disputes, and system health  

**KPIs:**
- Vendor approval turnaround < 24 hours  
- Successful order fulfillment monitoring > 99%  
- Admin dashboard load times < 2 seconds  

---

## III. Target Audience / Personas
- **Primary Users:** Internal operations team, technical leads, customer support agents  
- **Technical Proficiency:** Intermediate to advanced  

---

## IV. Scope
**In Scope:**
- Admin authentication & role-based access  
- Vendor management & approval workflow  
- User account management  
- Order monitoring and dispute resolution  
- Analytics dashboard and reports  

**Out of Scope (Phase 1):**
- Full CRM integration  
- Automated tax filing and advanced accounting  
- AI-powered recommendations for vendors  

---

## V. Features & Functional Requirements

### 5.1 Authentication & Access Control
- Secure login with MFA  
- Role-based access (Admin, Super Admin)  
- Password reset and session management  

### 5.2 Vendor & User Management
- View and approve/reject vendor applications  
- Edit vendor profiles and statuses  
- Suspend or reactivate vendor accounts  
- View and manage shopper accounts  
- Handle complaints, disputes, and escalations  

### 5.3 Order Monitoring
- Real-time view of all marketplace orders  
- Ability to flag or intervene in failed transactions  
- Track order status across all vendors  
- Generate dispute reports and resolutions  

### 5.4 System Health & Analytics
- KPIs: total sales, active vendors, new users  
- Error monitoring via Sentry  
- Traffic and usage analytics via GA4  
- Customizable dashboard widgets for key metrics  

### 5.5 Content & Product Oversight
- Approve or remove product listings  
- Manage categories and global marketplace settings  
- Moderate reviews and vendor content  

### 5.6 Reporting & Exports
- Generate CSV/PDF reports for:
  - Sales & revenue  
  - Vendor performance  
  - Customer insights  
- Export reports by date ranges or filters  

---

## VI. Technical & System Requirements
- **Frontend:** Next.js + Tailwind CSS + PWA support  
- **Backend:** Fastify server integrated with Supabase/PostgreSQL  
- **Security:** RLS for role-based data access, MFA required  
- **Scalability:** Hosted on AWS with Cloudflare CDN  
- **Performance:** Dashboard widgets and analytics load <2 seconds  

---

## VII. Integrations
| Service | Purpose | Integration Point |
|---------|--------|-----------------|
| Supabase | Auth, DB, Storage | Frontend SDK & Edge Functions |
| Stripe | Financial monitoring | Fastify backend |
| Pesapal | Local payment tracking | Fastify backend |
| DHL/FedEx/Sendy | Order shipping tracking | Fastify backend |
| AWS SES | Transactional emails | Backend services |
| GA4 | Traffic & analytics | Frontend & backend |
| Sentry | Error monitoring | Frontend & backend |

---

## VIII. UX & Design
- Responsive admin dashboard with sidebar navigation  
- Widget-based layout for KPIs and metrics  
- Alert system for critical issues or flagged orders  
- Clear tables and charts for order and vendor management  
- Consistent branding and typography with main app  

---

## IX. Milestones & Timeline (Admin Portal)
| Milestone | Target Date |
|-----------|------------|
| Admin Authentication & Role Setup | Week 1 |
| Vendor Approval & User Management MVP | Week 2-3 |
| Order Monitoring Dashboard MVP | Week 4-5 |
| Analytics & Reporting MVP | Week 6 |
| Content & Product Oversight MVP | Week 7 |
| Internal QA & UAT | Week 8 |
| Go-live MVP | Week 8 |

---

## X. KPIs & Success Metrics
- Vendor approval/rejection processed < 24 hours  
- Admin intervention on failed transactions < 1% error rate  
- Dashboard load times < 2 seconds  
- Accurate and timely reporting of KPIs  

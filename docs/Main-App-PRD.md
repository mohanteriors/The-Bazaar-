# The Bazaar - Main App Product Requirements Document (PRD)
**Document Version:** 1.0  
**Date Last Updated:** November 21, 2025  
**Portal:** Main Shopper App  
**Target Phase:** Phase 1 - Core MVP  

---

## I. Executive Summary
The Main App is the public-facing e-commerce platform for shoppers. It enables product discovery, browsing, cart management, checkout, and order tracking. The focus is on a mobile-first PWA experience, fast performance, and seamless payment integration.  

---

## II. Business Objectives & KPIs
- Launch MVP with product listings and checkout by Week 8  
- Ensure Page Load Times < 2 seconds for shopper portal  
- Achieve a stable uptime of >99.9%  

---

## III. Target Audience / Personas
- **Primary Users:** Global shoppers looking for unique Kenyan products  
- **Technical Proficiency:** Basic to advanced internet users, mobile-first  

---

## IV. Scope
**In Scope:**
- Product browsing & catalog  
- Shopping cart & checkout  
- PWA experience with offline caching  
- Stripe & Pesapal payment options  
- Order tracking and user dashboard  

**Out of Scope (Phase 1):**
- Wishlist sharing or social features  
- Advanced AI recommendations beyond basic personalization  
- Native mobile apps  

---

## V. Features & Functional Requirements

### 5.1 Product Discovery
- Faceted search: Category, price, vendor rating  
- Search bar with autocomplete suggestions  
- Product listing grid with pagination  
- Product detail pages:
  - Images, descriptions, price, variations
  - Stock availability
  - Reviews and ratings
  - Add to cart button
  - Related products

### 5.2 Shopping Cart & Checkout
- Add/remove items, adjust quantities  
- Persist cart across sessions  
- Checkout:
  - Shipping info
  - Payment integration (Stripe, Pesapal)
  - Order confirmation page & email

### 5.3 User Dashboard
- Profile management: Name, email, password  
- Order history with status updates (Received, Processed, Shipped, Delivered)  
- Address management (multiple shipping/billing addresses)  
- Invoice/receipt download  

### 5.4 Notifications & Communication
- Push notifications for order status  
- Email notifications via AWS SES  

### 5.5 Analytics & Performance
- Basic GA4 integration for tracking page views and conversions  
- Page performance metrics monitored via Sentry  

---

## VI. Technical & System Requirements
- **Frontend:** Next.js + Tailwind CSS + PWA support  
- **Backend:** Supabase/PostgreSQL, Edge Functions for lightweight operations  
- **Security:** MFA for user accounts, RLS for data access  
- **Scalability:** AWS hosting, caching strategies, CDN via Cloudflare  

---

## VII. Integrations
| Service | Purpose | Integration Point |
|---------|--------|-----------------|
| Supabase | Auth, DB, Storage | Frontend SDK & Edge Functions |
| Stripe | Global Payments | Fastify/Edge backend |
| Pesapal | Kenyan Payments (M-Pesa) | Fastify/Edge backend |
| AWS SES | Email notifications | Fastify service |
| Cloudflare | CDN/Security | DNS, caching |

---

## VIII. UX & Design
- Mobile-first responsive design  
- Minimalist, intuitive interface  
- Accessibility: WCAG 2.1 AA  
- Links to Figma mockups for all pages  

---

## IX. Milestones & Timeline (Main App)
| Milestone | Target Date |
|-----------|------------|
| Project Setup | Week 1-2 |
| Product Catalog MVP | Week 3-5 |
| Cart & Checkout MVP | Week 6-7 |
| User Dashboard & Notifications | Week 8 |
| Internal Testing & QA | Week 8 |
| Go-live MVP | Week 8 |

---

## X. KPIs & Success Metrics
- 2-second page load for main pages  
- Successful order checkout rate > 95%  
- Cart persistence across sessions > 90%  
- Bug-free checkout & account management workflows

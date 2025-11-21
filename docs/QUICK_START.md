# The Bazaar - Quick Start Guide for Developers

**Document Version:** 1.0  
**Date:** November 22, 2025  
**Author:** Manus AI

---

## Welcome to The Bazaar Development Team!

This guide will help you get started with The Bazaar codebase and understand the project structure, development workflow, and key resources.

## 1. Project Overview

**The Bazaar** is a multi-portal e-commerce platform consisting of three main applications:

1. **Main App (Shopper Portal):** Customer-facing marketplace for browsing and purchasing products.
2. **Vendor Portal:** Business dashboard for vendors to manage products, orders, and finances.
3. **Admin Portal:** Platform management interface for oversight, compliance, and operations.

All three portals are built as Progressive Web Apps (PWAs) within a monorepo architecture.

## 2. Tech Stack at a Glance

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | Next.js (App Router) |
| **UI Components** | Tailwind CSS + shadcn/ui |
| **State Management** | Zustand / React Query |
| **Backend** | Next.js Server Actions + tRPC |
| **Database** | PostgreSQL (via Supabase) |
| **ORM** | Prisma |
| **Authentication** | Supabase Auth |
| **File Storage** | Supabase Storage |
| **Payments** | Stripe, Pesapal, M-Pesa |
| **Email** | Resend |
| **Deployment** | Vercel (Frontend), AWS (Backend) |
| **Monitoring** | Sentry, Vercel Analytics |

## 3. Repository Structure

```
the-bazaar/
├── apps/
│   ├── main-app/          # Shopper-facing marketplace
│   ├── vendor-portal/     # Vendor management dashboard
│   ├── admin-portal/      # Admin oversight interface
│   └── api-service/       # Shared backend API service
├── libs/
│   ├── ui/                # Shared UI component library
│   └── data-access/       # Shared data access utilities
└── docs/                  # Project documentation
    ├── Master-PRD.md
    ├── BUILD_PLAN.md
    ├── ROADMAP.md
    ├── Build-Scratchpad.md
    └── ...
```

## 4. Essential Documentation

Before writing any code, please review these key documents:

| Document | Purpose | Location |
| :--- | :--- | :--- |
| **Master PRD** | High-level product requirements and business objectives | `docs/Master-PRD.md` |
| **Knowledge Base** | Technical reference, data models, workflows, and standards | `docs/Knowledge-Base.md` |
| **Build Plan** | Detailed task breakdown and dependencies | `docs/BUILD_PLAN.md` |
| **Roadmap** | 18-week development timeline | `docs/ROADMAP.md` |
| **Build Scratchpad** | Trackable checklist for progress tracking | `docs/Build-Scratchpad.md` |
| **Brand Kit** | Design system, colors, typography, and brand guidelines | `docs/Brand-Kit.md` |

### Portal-Specific Documentation

| Portal | PRD | Sitemap | User Flow |
| :--- | :--- | :--- | :--- |
| **Main App** | `docs/Main-App-PRD.md` | `docs/Main-App-Sitemap.md` | `docs/User-Flow.md` |
| **Vendor Portal** | `docs/Vendor-Portal-PRD.md` | `docs/Vendor-Portal-Sitemap.md` | `docs/Vendor-Flow.md` |
| **Admin Portal** | `docs/Admin-Portal-PRD.md` | `docs/Admin-Portal-Sitemap.md` | `docs/Admin-Flow.md` |

## 5. Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher)
- **Git**
- **PostgreSQL** (or access to Supabase project)

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/mohanteriors/The-Bazaar-.git
cd The-Bazaar-

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase and other API keys

# Run database migrations
pnpm prisma:migrate

# Start development servers
pnpm dev
```

## 6. Development Workflow

### Branch Strategy

- **`main`:** Production-ready code
- **`dev`:** Integration branch for ongoing development
- **`feature/*`:** Individual feature branches

### Workflow

1. Create a feature branch from `dev`
2. Develop your feature following the coding standards (see Knowledge Base)
3. Write tests for your code
4. Submit a Pull Request to `dev`
5. Code review and CI checks
6. Merge to `dev` after approval

### Coding Standards

All code must adhere to the standards outlined in the **Knowledge Base** (Section 9):

- **TypeScript only** (100% typed APIs)
- **ESLint + Prettier** enforced
- **Absolute imports** only
- Follow the established folder structure

## 7. Key Commands

```bash
# Development
pnpm dev                    # Start all apps in development mode
pnpm dev:main              # Start Main App only
pnpm dev:vendor            # Start Vendor Portal only
pnpm dev:admin             # Start Admin Portal only

# Building
pnpm build                 # Build all apps
pnpm build:main            # Build Main App only

# Testing
pnpm test                  # Run all tests
pnpm test:watch            # Run tests in watch mode
pnpm test:e2e              # Run E2E tests

# Database
pnpm prisma:studio         # Open Prisma Studio
pnpm prisma:migrate        # Run migrations
pnpm prisma:generate       # Generate Prisma client

# Linting & Formatting
pnpm lint                  # Run ESLint
pnpm format                # Run Prettier
```

## 8. Need Help?

- **Technical Questions:** Refer to the **Knowledge Base** (`docs/Knowledge-Base.md`)
- **Feature Clarifications:** Check the relevant PRD or Sitemap
- **Task Status:** Update the **Build Scratchpad** (`docs/Build-Scratchpad.md`)
- **Team Communication:** Use our designated Slack/Discord channel

## 9. Current Phase

We are currently in **Phase 0: Foundations & Setup** (Weeks 1-3).

**Current Priority Tasks:**
- Task 0.1.1: Initialize monorepo
- Task 0.1.2: Create app shells
- Task 0.1.3: Scaffold shared packages

Check the **ROADMAP.md** for the full timeline and **Build-Scratchpad.md** for task status.

---

**Welcome aboard! Let's build something amazing together.** 🚀

# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Overview

This is a **Medusa v2 monorepo** containing two main applications:
- **medusa-v2/**: The backend commerce server (Node.js/TypeScript)
- **medusa-v2-storefront/**: The frontend Next.js 15 application

Medusa v2 is a modular commerce platform built with TypeScript, using MikroORM for database operations and a module-based architecture.

## Common Development Commands

### Backend (medusa-v2/)
```bash
# Navigate to backend
cd medusa-v2

# Development
pnpm run dev                   # Start development server (port 9000)
pnpm run build                 # Build the application
pnpm start                     # Start production server
pnpm run seed                  # Seed database with demo data

# Testing
pnpm run test:unit             # Run unit tests
pnpm run test:integration:http # Run HTTP integration tests
pnpm run test:integration:modules # Run module integration tests

# Database
pnpm exec medusa db:generate <module-name>  # Generate migrations
pnpm exec medusa db:migrate                 # Run migrations
```

### Frontend (medusa-v2-storefront/)
```bash
# Navigate to storefront
cd medusa-v2-storefront

# Development
yarn dev                       # Start development server (port 8000, uses turbopack)
yarn build                     # Build for production
yarn start                     # Start production server
yarn lint                      # Run ESLint

# Setup
mv .env.template .env.local    # Setup environment variables
```

## Architecture

### Backend Structure (medusa-v2/)
```
src/
├── admin/          # Admin dashboard customizations (widgets, pages)
├── api/            # Custom API routes (REST endpoints)
├── jobs/           # Background job definitions
├── links/          # Module linking definitions
├── modules/        # Custom commerce modules
├── scripts/        # Utility scripts (e.g., seed.ts)
├── subscribers/    # Event subscribers
└── workflows/      # Business logic workflows
```

### Frontend Structure (medusa-v2-storefront/)
```
src/
├── app/            # Next.js 15 App Router pages
├── lib/            # Utility libraries and data fetching
├── modules/        # Feature-based components
├── styles/         # Global styles and Tailwind CSS
└── types/          # TypeScript type definitions
```

### Key Concepts

#### Medusa Modules
- **Self-contained packages** providing specific commerce functionality
- Located in `medusa-v2/src/modules/`
- Each module has models, services, and can expose API routes
- Examples: product, inventory, customer, payment modules

#### API Routes
- **File-based routing** in `medusa-v2/src/api/`
- Create `route.ts` files with HTTP method exports (GET, POST, etc.)
- Support path parameters using `[param]` directories
- Access container services via `req.scope.resolve()`

#### Workflows
- **Multi-step business processes** in `medusa-v2/src/workflows/`
- Composed of reusable steps that can be executed transactionally
- Used for complex operations like order processing, fulfillment

#### Admin Extensions
- **Widget and page customizations** for the admin dashboard
- Located in `medusa-v2/src/admin/`
- React components that extend existing admin functionality

### Data Flow
1. **Storefront** (Next.js) → **Medusa JS SDK** → **Backend API** (port 9000)
2. **Backend** processes requests through modules and workflows
3. **Database operations** handled by MikroORM with PostgreSQL
4. **Admin dashboard** provides merchant interface

## Environment Setup

### Backend Requirements
- Node.js >= 20
- PostgreSQL database
- Redis (optional, for caching/events)

### Required Environment Variables

#### Backend (.env):
```bash
DATABASE_URL=postgresql://user:pass@localhost/medusa-v2
STORE_CORS=http://localhost:8000
ADMIN_CORS=http://localhost:5173,http://localhost:9000
AUTH_CORS=http://localhost:5173,http://localhost:9000
JWT_SECRET=supersecret
COOKIE_SECRET=supersecret
```

#### Storefront (.env.local):
```bash
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=<publishable-key>
NEXT_PUBLIC_STRIPE_KEY=<stripe-public-key>  # Optional
```

## Development Workflow

1. **Start backend first**: `cd medusa-v2 && pnpm run dev`
2. **Set up database**: Run migrations and seed data
3. **Start storefront**: `cd medusa-v2-storefront && yarn dev`
4. **Access applications**:
   - Backend API: http://localhost:9000
   - Storefront: http://localhost:8000
   - Admin Dashboard: http://localhost:9000/app

## Testing Strategy

- **Unit tests**: Individual function/component testing
- **Integration tests**: 
  - HTTP: API endpoint testing
  - Modules: Module interaction testing
- **Test environment**: Uses `.env.test` configuration
- **Jest configuration**: Custom setup for SWC transpilation

## Package Management

- **Backend**: pnpm (lockfile: pnpm-lock.yaml)
- **Frontend**: Yarn v3 (lockfile: yarn.lock, config: .yarnrc.yml)

## Key Dependencies

### Backend
- `@medusajs/framework`: Core Medusa v2 framework
- `@medusajs/medusa`: Main Medusa application
- `@mikro-orm/*`: Database ORM
- `awilix`: Dependency injection container

### Frontend
- `next`: Next.js 15 with App Router
- `@medusajs/js-sdk`: Medusa JavaScript SDK
- `@medusajs/ui`: Medusa UI components
- `tailwindcss`: Utility-first CSS framework
- `@stripe/*`: Payment processing (optional)

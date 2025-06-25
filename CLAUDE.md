# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

**This is a shadcn/ui registry distribution repository** that provides a complete implementation of TanStack Table with Supabase integration. The repository serves as both:

1. **Registry Distribution**: Pre-built components that can be installed in other projects using the shadcn registry approach
2. **Demo Implementation**: A working example showing how to set up and use these components

The primary purpose is to enable easy installation of advanced data table components with Supabase integration across multiple projects using `npx shadcn@latest add <component-url>`.

## Development Commands

- `pnpm dev` - Start development server on http://localhost:3000
- `pnpm build` - Build the application for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint to check code quality
- `pnpm registry:build` - Build shadcn/ui registry components

## Project Architecture

This is a Next.js 15 project that demonstrates an advanced data table implementation with Supabase integration. **The core value is in the reusable registry components** that can be distributed to other projects via the shadcn registry system.

### Registry-First Design

- **Primary Goal**: Distribute shadcn + Supabase + TanStack Table components via registry
- **Demo Purpose**: Show working implementation for reference and testing
- **Reusable Components**: All data table components are designed for cross-project installation
- **Distribution Method**: Uses shadcn registry system for component sharing

### Core Architecture

- **Framework**: Next.js 15 with App Router (for demo)
- **Database**: Supabase integration with SSR support
- **UI Components**: shadcn/ui components with Radix UI primitives
- **State Management**: TanStack Table for data table state management
- **Styling**: Tailwind CSS with custom theme configuration
- **Registry System**: Complete shadcn registry for component distribution

### Separation of Concerns

**The architecture maintains a clear separation between framework and implementation:**

#### Framework Layer (Agnostic Components)
- **Location**: `src/components/data-table/` and `registry/data-table/components/data-table/`
- **Scope**: Pure shadcn/ui + TanStack Table components
- **Dependencies**: Only shadcn/ui, TanStack Table, and core React/TypeScript
- **Purpose**: Reusable, schema-agnostic data table framework
- **Characteristics**:
  - No Supabase dependencies
  - No specific schema knowledge
  - Generic column definitions
  - Reusable across any data source
  - Pure UI and table state management

#### Implementation Layer (Specific to Use Case)
- **Location**: `src/app/contacts/_components/` and `src/app/contacts/_lib/`
- **Scope**: Supabase integration + specific business logic
- **Dependencies**: Supabase clients, Zod validation, specific schemas
- **Purpose**: Demonstrates how to integrate framework components with real data
- **Characteristics**:
  - Supabase queries and mutations
  - Schema-specific column definitions
  - Form validations with Zod
  - Server actions for CRUD operations
  - Business logic and data transformations

This separation ensures that the core data-table components remain:
- **Technology agnostic**: Can work with any backend (Supabase, Prisma, tRPC, etc.)
- **Schema agnostic**: Can adapt to any table structure
- **Highly reusable**: Can be installed and used across different projects
- **Maintainable**: Framework improvements don't affect specific implementations

### Key Directories

- `src/app/` - Next.js app router pages and layouts
- `src/components/data-table/` - **Core agnostic data table framework components**
- `src/app/contacts/_components/` - **Implementation-specific table components (columns, etc.)**
- `src/app/contacts/_lib/` - **Implementation-specific logic (actions, queries, validations)**
- `src/lib/` - Utility functions and configurations
- `src/lib/supabase/` - Supabase client configurations (client, server, middleware)
- `registry/` - shadcn/ui registry components for distribution

### Data Table System

The project implements a sophisticated data table system with clear architectural boundaries:

#### Framework Features (Agnostic)
- **URL State Management**: All table state (pagination, sorting, filtering, column visibility, column order) is synced to URL parameters
- **Manual Server-Side Operations**: Table supports manual pagination, filtering, and sorting for server-side data
- **Advanced Filtering**: Multiple filter types (text, number, date, select, boolean) with various operators
- **Column Management**: Dynamic column visibility and ordering with drag-and-drop support
- **Type Safety**: Full TypeScript support with extended TanStack Table types

#### Implementation Features (Specific)
- **Data Fetching**: Supabase integration with SSR support
- **CRUD Operations**: Server actions for create, read, update, delete
- **Schema Validation**: Zod schemas for form validation
- **Business Logic**: Domain-specific transformations and calculations

### Supabase Integration

- Client-side: `src/lib/supabase/client.ts`
- Server-side: `src/lib/supabase/server.ts`
- Middleware: `src/lib/supabase/middleware.ts`
- Environment variables required: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Example Implementation (Demo)

The contacts table (`src/app/contacts/`) serves as a **reference implementation** demonstrating:

#### Implementation-Specific Files:
- **`_components/contacts-columns.tsx`**: Schema-specific column definitions using the agnostic framework
- **`_components/contacts-table.tsx`**: Integration of framework components with Supabase data
- **`_lib/actions.ts`**: Server actions for CRUD operations with Supabase
- **`_lib/queries.ts`**: Supabase queries and data fetching logic
- **`_lib/validations.ts`**: Zod schemas for contact data validation

#### Framework Integration Pattern:
1. **Import agnostic components** from `src/components/data-table/`
2. **Define schema-specific columns** in `_components/contacts-columns.tsx`
3. **Implement data operations** in `_lib/` (queries, actions, validations)
4. **Compose the table** in `_components/contacts-table.tsx`

**Note**: This pattern demonstrates how to consume the framework components while keeping implementation details separate and organized.

## Usage in Other Projects

1. **Install framework components**: `npx shadcn@latest add <registry-url>`
2. **Set up your data layer** (Supabase, Prisma, tRPC, etc.)
3. **Create implementation directory structure**: `_components/` and `_lib/`
4. **Define your columns** using the agnostic framework components
5. **Implement your data operations** (queries, actions, validations)
6. **Follow the patterns** shown in `src/app/contacts/` for integration

The framework components handle all the complex table state management while remaining completely agnostic to your specific data source and schema.

### Registry System

**This is the core feature of the repository:**
- `registry.json` - Main registry configuration for component distribution
- `registry/` - Source components designed for registry distribution
- `public/r/` - Built registry files for external consumption via URL
- Components can be installed in other projects using: `npx shadcn@latest add <component-url>`
- Run `pnpm registry:build` to build components for distribution

The registry enables other projects to install these advanced data table components with:
```bash
npx shadcn@latest add https://your-domain.com/r/data-table
```

## Environment Setup

1. Copy `.env.example` to `.env.local`
2. Configure Supabase URL and anon key
3. Run `pnpm install` to install dependencies
4. Run `pnpm dev` to start development server (for demo/testing)
5. Run `pnpm registry:build` to build registry components for distribution

## Testing

No specific test commands are configured. Check for test files in the codebase before adding testing capabilities.
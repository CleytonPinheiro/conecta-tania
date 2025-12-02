# Conecta Tânia - Student Projects Showcase

## Overview

Conecta Tânia is a web application showcasing student projects from the Development of Systems course at Colégio Estadual Tânia Varella in Maringá, PR, Brazil. The platform displays projects from two classes (Turma 1C and 2C), featuring student work in categories like interactive maps, attendance systems, agendas, and garden projects. The application provides a clean, educational-focused interface for browsing projects with filtering capabilities and admin functionality for managing content.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework:** React with TypeScript using Vite as the build tool
- **Routing:** Wouter for client-side routing with pages for Home, Turma 1C, Turma 2C, and Admin
- **State Management:** TanStack React Query for server state management and data fetching
- **UI Components:** Shadcn/ui component library built on Radix UI primitives
- **Styling:** Tailwind CSS with custom design system following educational platform aesthetics (inspired by Google Classroom/Canvas)
- **Form Handling:** React Hook Form with Zod validation via @hookform/resolvers

**Design Philosophy:**
- System-based approach with card-focused interface emphasizing student work
- Clean, accessible layout suitable for educational content
- Professional yet approachable visual language
- Inter font family for optimal readability
- Responsive mobile-first design with breakpoints for tablet and desktop

**Key Pages:**
- Home: Overview with hero section, statistics, and turma cards
- Turma 1C/2C: Filtered project views for each class
- Admin: CRUD interface for managing turmas and projetos
- Not Found: 404 error page

**Component Structure:**
- Reusable components (Header, Footer, Hero, ClassFilter, ProjectCard, ProjectsGrid)
- UI primitives from Shadcn/ui for consistency
- Example components for documentation/testing

### Backend Architecture

**Framework:** Express.js with TypeScript
- **Server Setup:** HTTP server with middleware for JSON parsing and request logging
- **Development Mode:** Vite integration for HMR during development
- **Production Mode:** Static file serving from dist/public directory

**API Design:**
- RESTful endpoints under `/api` prefix
- CRUD operations for turmas (classes) and projetos (projects)
- Routes defined in `server/routes.ts`
- Storage abstraction layer in `server/storage.ts` implementing IStorage interface

**API Endpoints:**
- `GET /api/turmas` - List all classes
- `GET /api/turmas/:id` - Get specific class
- `POST /api/turmas` - Create new class
- `GET /api/projetos` - List all projects
- `GET /api/projetos/turma/:turmaId` - Get projects by class
- `POST /api/projetos` - Create new project
- `PUT /api/projetos/:id` - Update project
- `DELETE /api/projetos/:id` - Delete project

**Data Validation:**
- Zod schemas for runtime validation
- Drizzle-zod integration for type-safe database operations
- Validation occurs at API layer before database operations

### Data Storage Solutions

**Database:** PostgreSQL via Neon serverless
- **ORM:** Drizzle ORM for type-safe database operations
- **Connection:** Connection pooling via @neondatabase/serverless
- **Schema Location:** `shared/schema.ts` for shared types between frontend and backend

**Database Schema:**
1. **users table:**
   - id (UUID, primary key)
   - username (text, unique)
   - password (text)

2. **turmas table:**
   - id (serial, primary key)
   - nome (text, unique) - Class name (e.g., "1C", "2C")
   - descricao (text, nullable) - Class description

3. **projetos table:**
   - id (serial, primary key)
   - titulo (text) - Project title
   - descricao (text, nullable) - Project description
   - categoria (text) - Category (Sistema, Agenda, Mapas, Horta)
   - alunos (text array) - Array of student names
   - turmaId (serial, foreign key to turmas)
   - linkCanva (text, nullable)
   - linkVideo (text, nullable)
   - linkGithub (text, nullable)
   - linkDemo (text, nullable)

**Storage Pattern:**
- Database storage class implementing IStorage interface
- Abstraction allows for potential alternative storage implementations
- Type-safe operations using Drizzle ORM queries

### Authentication and Authorization

**Current State:** Basic user table exists in schema but authentication is not fully implemented
- User model with username/password fields prepared for future authentication
- No active session management or JWT implementation in current codebase
- Admin page accessible without authentication (should be protected in production)

**Prepared for:**
- Express session middleware (connect-pg-simple available in dependencies)
- Passport.js local strategy (dependencies included)
- JWT tokens (jsonwebtoken in dependencies)

## External Dependencies

### Database & ORM
- **Neon Serverless PostgreSQL** - Serverless Postgres database hosting
- **Drizzle ORM** - TypeScript ORM for database operations
- **Drizzle Kit** - Migration tool and database introspection

### UI Framework & Components
- **React** - Frontend framework
- **Radix UI** - Unstyled, accessible component primitives (accordion, dialog, dropdown, select, tabs, toast, etc.)
- **Shadcn/ui** - Pre-built component library built on Radix UI
- **Tailwind CSS** - Utility-first CSS framework
- **Class Variance Authority** - Utility for managing component variants

### State Management & Data Fetching
- **TanStack React Query** - Server state management and data fetching
- **Wouter** - Lightweight routing library

### Form Handling & Validation
- **React Hook Form** - Form state management
- **Zod** - TypeScript-first schema validation
- **@hookform/resolvers** - Validation resolvers for React Hook Form

### Build Tools
- **Vite** - Frontend build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **ESBuild** - Fast JavaScript bundler for server code

### Development Tools
- **Replit Plugins** - Runtime error overlay, cartographer, dev banner for Replit environment

### Utilities
- **date-fns** - Date manipulation library
- **clsx & tailwind-merge** - Utility for conditional className management
- **Lucide React** - Icon library

### Potential Future Integrations
Dependencies included but not fully implemented:
- **Passport.js** - Authentication middleware
- **Express Session** - Session management
- **JSON Web Tokens** - Token-based authentication
- **Nodemailer** - Email sending
- **Multer** - File upload handling
- **Stripe** - Payment processing
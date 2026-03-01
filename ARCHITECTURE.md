# Technical Architecture

This document describes the technical design and architectural choices made for the RentaCar project.

## 1. Database & Persistence

### Prisma 7 Implementation
The project uses **Prisma 7** with the `@prisma/adapter-pg` driver. This choice was made to resolve connection stability issues in serverless environments like Vercel.

**Connection Pooling:**
We use a `Pool` configuration in `lib/db.ts` to manage database connections efficiently:
- `max: 10`: Limits the number of concurrent connections (Supabase friendly).
- `idleTimeoutMillis: 30000`: Closes idle connections to prevent connection leaks.

### Schema Overview
- `User`: Handles authentication and roles (`USER`, `ADMIN`). Tracks document verification status.
- `Car`: Stores car specifications and features (stored as a JSON string for flexibility).
- `Reservation`: Links users to cars. Supports status tracking (`upcoming`, `active`, `completed`, `cancelled`).

## 2. Authentication Flow

Authentication is built using a "Stateless JWT" approach:
1. **JWT Generation**: Uses the `jose` library to sign tokens with `HS256`.
2. **Session Storage**: Stored in a `session` cookie with `httpOnly: true` and `secure: true` (in production).
3. **Permission Handling**: `getCurrentUser()` helper retrieves the session and validates the user against the database to ensure the role and status are up to date.

## 3. Server Actions & Performance

Most database interactions are handled via **React Server Actions** (`lib/actions.ts`):
- **Data Fetching**: Optimized using Next.js caching and revalidation (`revalidatePath`).
- **Conflict Avoidance**: The `getCars` action performs a complex check against existing reservations to ensure only available cars are shown for selected dates.

## 4. Scaling Considerations

- **Serverless Ready**: The build process includes `prisma generate` to ensure the client is built for the specific runtime.
- **Supabase Integration**: Leveraging Supabase's connection pooling (PgBouncer) on port 6543 for efficient connection management.
- **Static vs Dynamic**: Sensitive pages (profile, admin) are dynamic, while the home page and browse page use partial pre-rendering where possible.

## 5. Deployment Pipeline

- **CI/CD**: Managed by Vercel.
- **Environment Management**: `.env` for local, Vercel Dashboard for production.
- **Zero-Downtime Migration**: Database changes are pushed using `prisma db push` during the build phase for rapid iteration.

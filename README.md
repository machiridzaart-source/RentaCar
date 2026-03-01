# RentaCar - Car Rental & Booking Application

A high-performance, modern car rental platform built with Next.js 16, Prisma 7, and Supabase.

## 🚀 Quick Start

### Prerequisites
- Node.js v24+
- pnpm (recommended)
- Supabase Project

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL`: Your Supabase connection string (pooling URL recommended)
   - `JWT_SECRET`: A secure string for authentication

4. Run the development server:
   ```bash
   npm run dev
   ```

## 🛠 Tech Stack
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Database**: [PostgreSQL (Supabase)](https://supabase.com/)
- **ORM**: [Prisma 7](https://www.prisma.io/)
- **Authentication**: JWT via `jose` and `bcryptjs`
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📁 Project Structure
- `app/`: Next.js pages and API routes (Server Components by default)
- `components/`: Reusable UI components
- `lib/`: Core logic, server actions, and database initialization
- `prisma/`: Database schema and seed scripts
- `public/`: Static assets (logos, car images)
- `contexts/`: React context for client-side state management

## 🗄 Database Setup
The project uses Prisma 7 with a PostgreSQL adapter for stable connections.

**Push Schema:**
```bash
npx prisma db push
```

**Seed Data:**
```bash
npm run seed
```

## 🔐 Authentication
Authentication is handled via custom JWT implementation:
- **Registration**: Creates a user and sets a secure HTTP-only cookie.
- **Login**: Validates credentials and creates a session.
- **Admin**: Specific role for managing users and cars.

## 🚢 Deployment
The project is optimized for **Vercel**.
- Build command: `prisma generate && next build`
- Environment variables must be configured in the Vercel dashboard.

---
Built with ❤️ by the RentaCar Team

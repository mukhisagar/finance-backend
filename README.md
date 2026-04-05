# Finance Dashboard Backend

Backend for finance dashboard with RBAC (Viewer, Analyst, Admin), financial records CRUD, dashboard summaries/trends. Built with Node.js/Express, Prisma/SQLite, TypeScript, Zod validation.

## Quick Start

1. cd finance-backend
2. copy .env.example .env (edit JWT_SECRET if desired)
3. npm install
4. npx prisma generate
5. npx prisma migrate dev --name init
6. npx prisma db seed # Creates demo users: admin@example.com/admin123, analyst/ viewer

7. npm run dev

Server runs on http://localhost:3000

## API Docs

**Base URL**: http://localhost:3000/api/v1

### Auth (public)

- POST /auth/login
  ```bash
  curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
  ```
  Response: `{ "token": "...", "user": {..} }`

**Protected (Bearer token)**
Use token in `Authorization: Bearer <token>`

### Users (Admin only)

- POST /users # Create user
- GET /users # List users
- PATCH /users/:id # Update role/active

### Records (Admin/Analyst create/update/delete; all auth read)

- POST /records
- GET /records?type=INCOME&category=Food&dateFrom=2024-01-01
- PATCH /records/:id
- DELETE /records/:id # Soft delete

### Dashboard (All roles)

- GET /dashboard/summary # Totals, categories, recent
- GET /dashboard/trends?period=monthly

## Roles & Permissions

- **Viewer**: Dashboard summaries
- **Analyst**: View records + full dashboard
- **Admin**: Full CRUD + user mgmt

## Assumptions/Notes

- SQLite for simplicity (dev.db created automatically)
- JWT expires in 24h
- Soft deletes
- No pagination (add if needed)
- Validation with Zod
- Error handling with status codes

## Testing

Demo login as admin, create records, test RBAC by switching accounts.

Prisma Studio: npx prisma studio

Clean DB: rm dev.db && npx prisma migrate reset

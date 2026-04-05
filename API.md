# Finance Backend API Documentation

**Base URL:** `http://localhost:3000/api/v1`

## Authentication
All protected routes require `Authorization: Bearer <token>`

**POST /auth/login**
```
{
  "email": "admin@example.com",
  "password": "admin123"
}
```
Response:
```
{
  "token": "eyJ...",
  "user": {"id": "...", "email": "...", "role": "ADMIN"}
}
```
**Demo users:** viewer/analyst/admin @example.com : "password123"

## Roles & Permissions
- **VIEWER**: Dashboard summaries
- **ANALYST**: Records read + full dashboard
- **ADMIN**: Full CRUD + user management

## Users (Admin only)
**POST /users**
```
{
  "email": "user@example.com",
  "password": "pass123",
  "roleId": "role-id"
}
```

**PATCH /users/:id/role**
```
{
  "roleId": "new-role-id"
}
```

## Financial Records
**POST /records**
```
{
  "amount": 100.5,
  "type": "INCOME",
  "category": "Salary",
  "date": "2024-10-01T00:00:00Z",
  "notes": "Monthly pay"
}
```

**GET /records?type=INCOME&category=Food&dateFrom=2024-10-01&dateTo=2024-10-31**
List filtered records (paginated soon)

**PATCH /records/:id**
```
{
  "amount": 200,
  "category": "Bonus"
}
```

**DELETE /records/:id**
Soft delete

## Dashboard
**GET /dashboard/summary**
```
{
  "income": 3000,
  "expense": 800,
  "net": 2200,
  "categoryTotals": [...],
  "recent": [...]
}
```

**GET /dashboard/trends?period=monthly**
Trends data

**GET /dashboard/recent**
Last 5 transactions

## Error Format
```
{
  "error": "Detailed message"
}
```
**Codes:** 400 validation, 403 forbidden, 404 not found, 500 server

**Health:** GET /health → `{"status":"OK"}`

**Test with PowerShell:** `iwr -Uri ... -Method POST -ContentType 'application/json' -Body '...' -UseBasicParsing -Headers @{Authorization="Bearer token"}`

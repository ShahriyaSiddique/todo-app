# Todo App (Nest.js + MySQL + Next.js)

A simple full-stack To-Do application built with **Nest.js**, **MySQL**,
and **Next.js**, using **TypeScript**, **Repository Pattern**, and
**JWT-protected APIs**.

This project demonstrates clean architecture, separation of concerns,
and production-oriented backend practices.

------------------------------------------------------------------------

## Tech Stack

### Backend

-   Nest.js
-   TypeORM + MySQL
-   JWT authentication (middleware-based)
-   Class Validator / DTOs
-   Jest (unit testing)

### Frontend

-   Next.js (App Router)
-   TypeScript
-   Tailwind CSS
-   Fetch API

### Infrastructure

-   Docker + Docker Compose (MySQL + phpMyAdmin)

------------------------------------------------------------------------

## Project Structure

``` text
.
├── backend/        # Nest.js application
├── frontend/       # Next.js application
├── docker-compose.yml
└── README.md
```

------------------------------------------------------------------------

## Prerequisites

-   Node.js **18+** (or 20)
-   Docker & Docker Compose
-   npm (or pnpm/yarn)

------------------------------------------------------------------------

## 1️⃣ Start MySQL & phpMyAdmin (Docker)

From the project root:

``` bash
docker compose up -d
```

This will start: - **MySQL 8** database container - **phpMyAdmin** for
database inspection

### phpMyAdmin Access

After starting Docker, open:

    http://localhost:8080

Login credentials (default from docker-compose):

-   **Server:** mysql
-   **Username:** root (or `todo_user`)
-   **Password:** as defined in `docker-compose.yml`

------------------------------------------------------------------------

## 2️⃣ Backend Setup (Nest.js)

### Install dependencies

``` bash
cd backend
npm install
```

### Environment variables

``` bash
cp .env.example .env
```

Update values if needed (defaults work with docker-compose).

### Run database migrations

``` bash
npm run migration:run
```

### Start backend server

``` bash
npm run start:dev
```

Backend will run on:

    http://localhost:3001

------------------------------------------------------------------------

## JWT Authentication (Dev Mode)

All `/todos` endpoints are protected by JWT middleware.

### Generate a dev token

``` bash
cd backend
node -e "console.log(require('jsonwebtoken').sign({ sub: 'dev-user' }, process.env.JWT_SECRET || 'dev_super_secret', { expiresIn: '7d' }))"
```

Use the generated token as:

    Authorization: Bearer <TOKEN>

------------------------------------------------------------------------

## 3️⃣ Frontend Setup (Next.js)

### Install dependencies

``` bash
cd frontend
npm install
```

### Environment variables

``` bash
cp .env.local.example .env.local
```

Set your backend URL and JWT token:

``` env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_JWT_TOKEN=PASTE_YOUR_JWT_TOKEN_HERE
```

### Start frontend

``` bash
npm run dev
```

Frontend will run on:

    http://localhost:3000

------------------------------------------------------------------------

## API Endpoints

| Method | Endpoint     | Description                           |
| ------ | ------------ | ------------------------------------- |
| POST   | `/todos`     | Create a new todo                     |
| GET    | `/todos`     | List todos (optional `status` filter) |
| GET    | `/todos/:id` | Get todo by ID                        |
| PUT    | `/todos/:id` | Update todo                           |
| DELETE | `/todos/:id` | Delete todo                           |

### Example request

``` bash
curl http://localhost:3001/todos \
  -H "Authorization: Bearer <TOKEN>"
```

------------------------------------------------------------------------

## Backend Architecture (Clean Architecture)

``` text
todo/
├── domain/           # Business contracts (interfaces, enums)
├── application/      # Services & DTOs
├── infrastructure/   # ORM entities & repository implementations
└── presentation/     # Controllers
```

-   Services depend on **interfaces**, not ORM
-   Repository pattern enforced via DI tokens
-   Database schema managed via migrations (no `synchronize`)

------------------------------------------------------------------------

## Testing

### Run backend tests

``` bash
cd backend
npm run test
```

Includes: - Unit test for `TodoService` - Mocked repository (no DB
dependency)

------------------------------------------------------------------------

## Notes

-   phpMyAdmin is included **only for local development convenience**
-   JWT middleware is applied at API level (not guards)
-   Designed for clarity, maintainability, and review readability

------------------------------------------------------------------------

## License

MIT
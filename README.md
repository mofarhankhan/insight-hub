# InsightHub — Business Intelligence Dashboard

A large full-stack dashboard application built with:

- **Frontend:** React + Vite + React Router + Axios + Recharts
- **Backend:** Node.js + Express + JWT authentication
- **Database:** MySQL
- **Architecture:** REST API + service-style controllers + protected routes

## 1. What is InsightHub?

InsightHub is a modern analytics and operations dashboard for a fictional company. It is **not** an e-commerce application and it is not a task-management application.

The application gives an organization a central place to:

- monitor business KPIs
- inspect revenue and customer analytics
- browse customers
- inspect transactions
- view product/service performance
- review activity/events
- manage dashboard settings
- authenticate users securely

The UI is intentionally dashboard-heavy: sidebar navigation, KPI cards, charts, tables, filters, responsive layout, dark/light mode, profile menu and notification area.

---

# 2. Main Features

## Authentication
- Login screen
- JWT access token
- Password hashing with bcrypt
- Protected API routes
- Protected React routes
- Demo account seeded automatically

## Dashboard
- Total revenue
- Total customers
- Active subscriptions
- Conversion rate
- Revenue chart
- Customer growth chart
- Channel distribution
- Recent transactions
- Recent activity

## Analytics
- Revenue trends
- Customer growth
- Acquisition channels
- Top performing offerings
- Summary statistics

## Customers
- Search
- Status filtering
- Customer table
- Customer profile details
- Customer lifetime value

## Transactions
- Search
- Status filtering
- Amount
- Customer
- Date
- Payment method

## Offerings
- Performance table
- Revenue
- Units
- Growth
- Status

## Activity
- System/business events
- Event types
- Timestamps
- User attribution

## Settings
- Profile information
- Notification preferences
- Appearance preference
- Security section

---

# 3. Demo Login

Email:
`admin@insighthub.local`

Password:
`Admin@123`

---

# 4. Requirements

Install these first:

- Node.js 18+
- npm 9+
- MySQL 8+

Check:

```bash
node -v
npm -v
mysql --version
```

---

# 5. Database Setup

Create a MySQL database.

Open MySQL:

```bash
mysql -u root -p
```

Then run:

```sql
CREATE DATABASE insighthub;
EXIT;
```

The backend will create the tables and seed demo data automatically when started.

If you want to use a different database name, change `DB_NAME` in:

`server/.env`

---

# 6. Backend Setup

Open a terminal:

```bash
cd server
npm install
```

Create `.env` from `.env.example`.

Windows CMD:

```cmd
copy .env.example .env
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

Linux/macOS:

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=insighthub
DB_USER=root
DB_PASSWORD=your_mysql_password
JWT_SECRET=change_this_to_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

Start backend:

```bash
npm run dev
```

Backend URL:

`http://localhost:5000`

Health check:

`http://localhost:5000/api/health`

---

# 7. Frontend Setup

Open another terminal:

```bash
cd client
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

Open the URL Vite prints, normally:

`http://localhost:5173`

---

# 8. One-command development

Run backend and frontend in separate terminals.

Terminal 1:

```bash
cd server
npm run dev
```

Terminal 2:

```bash
cd client
npm run dev
```

---

# 9. Project Structure

```text
insight-hub/
│
├── README.md
│
├── server/
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── config/
│       │   └── db.js
│       ├── controllers/
│       │   ├── analyticsController.js
│       │   ├── authController.js
│       │   ├── customerController.js
│       │   ├── offeringController.js
│       │   └── transactionController.js
│       ├── database/
│       │   └── init.js
│       ├── middleware/
│       │   └── auth.js
│       ├── routes/
│       │   ├── analytics.js
│       │   ├── auth.js
│       │   ├── customers.js
│       │   ├── offerings.js
│       │   └── transactions.js
│       ├── utils/
│       │   └── jwt.js
│       └── index.js
│
└── client/
    ├── .env.example
    ├── index.html
    ├── package.json
    └── src/
        ├── components/
        ├── hooks/
        ├── layouts/
        ├── pages/
        ├── services/
        ├── App.jsx
        ├── main.jsx
        └── styles.css
```

---

# 10. API Overview

All protected endpoints require:

```http
Authorization: Bearer <token>
```

### Authentication

`POST /api/auth/login`

### Dashboard

`GET /api/analytics/dashboard`

### Analytics

`GET /api/analytics/overview`

### Customers

`GET /api/customers`
`GET /api/customers/:id`

### Transactions

`GET /api/transactions`

### Offerings

`GET /api/offerings`

### Health

`GET /api/health`

---

# 11. Database Tables

The application creates:

- `users`
- `customers`
- `offerings`
- `transactions`
- `activity_logs`

Relationships:

```text
users
  │
  └── activity_logs

customers
  │
  └── transactions

offerings
  │
  └── transactions
```

---

# 12. Seed Data

On first backend startup the database receives demo data:

- 1 admin user
- 25 customers
- 8 offerings
- 80 transactions
- 40 activity records

The seed script is safe to run repeatedly because it checks whether the data already exists.

---

# 13. Production Build

Frontend:

```bash
cd client
npm run build
```

Preview:

```bash
npm run preview
```

Backend:

```bash
cd server
npm start
```

For production, use a process manager such as PM2 or Docker and configure production environment variables.

---

# 14. Common Problems

## MySQL connection error

Check:

- MySQL service is running
- username is correct
- password is correct
- database exists
- port is usually `3306`

## CORS error

Make sure:

```env
CLIENT_URL=http://localhost:5173
```

matches your frontend URL.

## Frontend says API unavailable

Make sure backend is running:

```bash
cd server
npm run dev
```

and frontend `.env` contains:

```env
VITE_API_URL=http://localhost:5000/api
```

Restart Vite after changing `.env`.

## Login does not work

Use:

```text
admin@insighthub.local
Admin@123
```

If you changed the database manually, restart the backend so the seed process can complete.

---

# 15. Development Flow

A recommended order for understanding the project:

1. Start MySQL
2. Start Node.js API
3. Start React frontend
4. Login
5. Explore Dashboard
6. Explore Analytics
7. Explore Customers
8. Explore Transactions
9. Explore Offerings
10. Explore Settings
11. Inspect API routes
12. Inspect MySQL tables

---

# 16. Technologies

### Frontend
- React
- Vite
- React Router
- Axios
- Recharts
- Lucide React

### Backend
- Node.js
- Express
- MySQL2
- JSON Web Token
- bcryptjs
- CORS
- dotenv

---

# 17. Security Notes

This project is intended for development/learning.

Before production:

- replace the JWT secret
- use HTTPS
- configure secure cookies/token storage strategy
- add rate limiting
- validate all request bodies
- add role-based authorization
- add database migrations
- use a production database user instead of root
- add structured logging
- add automated tests

---

# 18. License

MIT — use and modify this project for learning and portfolio work.

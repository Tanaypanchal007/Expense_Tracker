# ExpenseFlow — Expense Tracker

A simple full-stack expense tracker built with React, Vite, Tailwind CSS, Express, and MongoDB.

## Features
- Dashboard summary: total expenses, highest expense, transaction count
- Recent expenses table
- Add, edit, and delete expenses
- Left sidebar with expandable **Expenses** submenu:
  - All Expenses
  - Categories
- Reports page with simple category totals
- Responsive layout
- MongoDB persistence through an Express REST API

## Requirements
- Node.js 18+
- MongoDB local instance or MongoDB Atlas connection string

## 1. Backend setup

Open a terminal:

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and update the MongoDB connection string:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/expenseflow
```

Start the backend:

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

## 2. Frontend setup

Open a second terminal:

```bash
cd frontend
npm install
```

Copy `.env.example` to `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/expenses` | Get all expenses |
| POST | `/api/expenses` | Create an expense |
| PUT | `/api/expenses/:id` | Update an expense |
| DELETE | `/api/expenses/:id` | Delete an expense |
| GET | `/api/health` | Check API status |

## Project structure

```text
ExpenseFlow/
├── backend/
│   ├── models/Expense.js
│   ├── routes/expenses.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/api.js
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .env.example
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    └── vite.config.js
```

## Notes
- The app uses straightforward React state and Axios requests to keep the logic beginner-friendly.
- The backend validates required fields and amounts.
- For a real deployment, configure production CORS, authentication, and secrets appropriately.

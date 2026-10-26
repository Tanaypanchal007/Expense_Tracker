import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

const pageInfo = {
  "/": ["Home", "Your personal finance overview."],
  "/dashboard": ["Dashboard", "Welcome back! Here's your expense overview."],
  "/expenses": ["All Expenses", "Keep track of where your money goes."],
  "/expenses/categories": ["Expense Categories", "Understand where your money goes."],
  "/expenses/add": ["Add Expense", "Record a new transaction."],
  "/reports": ["Spending Report", "Review your spending by category."],
};

function Layout() {
  const location = useLocation();
  const info = pageInfo[location.pathname] || ["ExpenseFlow", "Manage your expenses simply."];
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="min-h-screen md:ml-64">
        <Topbar title={info[0]} subtitle={info[1]} />
        <main className="p-4 sm:p-6 lg:p-8"><Outlet /></main>
      </div>
    </div>
  );
}

export default Layout;

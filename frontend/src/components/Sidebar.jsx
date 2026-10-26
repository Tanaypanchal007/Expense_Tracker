import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  CircleDollarSign, LayoutDashboard, House, WalletCards, PlusCircle,
  ChevronDown, ChevronRight, ChartNoAxesCombined, Tags, FileChartColumn,
} from "lucide-react";

const linkBase = "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition";
const activeLink = "bg-emerald-50 text-emerald-700";
const inactiveLink = "text-slate-600 hover:bg-slate-50 hover:text-slate-900";

function Sidebar() {
  const [expensesOpen, setExpensesOpen] = useState(true);
  const [reportsOpen, setReportsOpen] = useState(false);

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white md:flex">
      <div className="flex h-[88px] items-center gap-3 border-b border-slate-100 px-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
          <CircleDollarSign size={27} />
        </div>
        <div>
          <p className="text-xl font-extrabold tracking-tight text-slate-900">Expense<span className="text-emerald-600">Flow</span></p>
          <p className="text-xs text-slate-500">Personal finance tracker</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-7">
        <p className="mb-4 px-3 text-xs font-bold uppercase tracking-widest text-slate-400">Main menu</p>
        <NavLink to="/" end className={({ isActive }) => `${linkBase} ${isActive ? activeLink : inactiveLink}`}>
          <House size={20} /> Home
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => `${linkBase} ${isActive ? activeLink : inactiveLink}`}>
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>

        <div>
          <button onClick={() => setExpensesOpen(!expensesOpen)} className={`${linkBase} w-full justify-between ${expensesOpen ? "text-emerald-700" : inactiveLink}`}>
            <span className="flex items-center gap-3"><WalletCards size={20} /> Expenses</span>
            {expensesOpen ? <ChevronDown size={17} /> : <ChevronRight size={17} />}
          </button>
          {expensesOpen && (
            <div className="ml-5 mt-1 space-y-1 border-l border-slate-200 pl-3">
              <NavLink to="/expenses" end className={({ isActive }) => `flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm ${isActive ? "bg-emerald-50 font-semibold text-emerald-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}>
                <WalletCards size={16} /> All Expenses
              </NavLink>
              <NavLink to="/expenses/categories" className={({ isActive }) => `flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm ${isActive ? "bg-emerald-50 font-semibold text-emerald-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}>
                <Tags size={16} /> Categories
              </NavLink>
              <NavLink to="/expenses/add" className={({ isActive }) => `flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm ${isActive ? "bg-emerald-50 font-semibold text-emerald-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}>
                <PlusCircle size={16} /> Add Expense
              </NavLink>
            </div>
          )}
        </div>

        <div>
          <button onClick={() => setReportsOpen(!reportsOpen)} className={`${linkBase} w-full justify-between ${reportsOpen ? "text-emerald-700" : inactiveLink}`}>
            <span className="flex items-center gap-3"><ChartNoAxesCombined size={20} /> Reports</span>
            {reportsOpen ? <ChevronDown size={17} /> : <ChevronRight size={17} />}
          </button>
          {reportsOpen && (
            <div className="ml-5 mt-1 space-y-1 border-l border-slate-200 pl-3">
              <NavLink to="/reports" className={({ isActive }) => `flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm ${isActive ? "bg-emerald-50 font-semibold text-emerald-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}>
                <FileChartColumn size={16} /> Spending report
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      <div className="border-t border-slate-100 p-5">
        <div className="rounded-2xl bg-emerald-50 p-4">
          <p className="text-sm font-semibold text-slate-900">Expense Tracker</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">Manage your money smarter.</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

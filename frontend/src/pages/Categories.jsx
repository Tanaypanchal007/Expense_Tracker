import { useEffect, useMemo, useState } from "react";
import { FolderOpen, ShoppingBag, Utensils, Car, ReceiptText, GraduationCap, HeartPulse, CircleDollarSign } from "lucide-react";
import PageHeading from "../components/PageHeading.jsx";
import { getExpenses } from "../services/api.js";

const categoryDetails = [
  { name: "Food", icon: Utensils, color: "bg-orange-50 text-orange-600" },
  { name: "Travel", icon: Car, color: "bg-blue-50 text-blue-600" },
  { name: "Shopping", icon: ShoppingBag, color: "bg-violet-50 text-violet-600" },
  { name: "Bills", icon: ReceiptText, color: "bg-amber-50 text-amber-600" },
  { name: "Education", icon: GraduationCap, color: "bg-indigo-50 text-indigo-600" },
  { name: "Health", icon: HeartPulse, color: "bg-rose-50 text-rose-600" },
  { name: "Entertainment", icon: FolderOpen, color: "bg-pink-50 text-pink-600" },
  { name: "Other", icon: CircleDollarSign, color: "bg-emerald-50 text-emerald-600" },
];

function Categories() {
  const [expenses, setExpenses] = useState([]);
  useEffect(() => { getExpenses().then(setExpenses).catch(() => {}); }, []);
  const totals = useMemo(() => {
    const result = {};
    expenses.forEach((expense) => { result[expense.category] = (result[expense.category] || 0) + Number(expense.amount || 0); });
    return result;
  }, [expenses]);
  const money = (amount) => `₹${Number(amount || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

  return (
    <>
      <PageHeading eyebrow="Organize spending" title="Expense Categories" description="See how much you have recorded in each spending category." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {categoryDetails.map(({ name, icon: Icon, color }) => <div key={name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><div className={`rounded-xl p-3 ${color}`}><Icon size={22} /></div><span className="text-xs text-slate-400">{expenses.filter((item) => item.category === name).length} transactions</span></div><h3 className="mt-5 font-semibold text-slate-800">{name}</h3><p className="mt-1 text-2xl font-bold text-slate-900">{money(totals[name] || 0)}</p><div className="mt-4 h-1.5 rounded-full bg-slate-100"><div className="h-1.5 rounded-full bg-emerald-500" style={{ width: `${Math.min(100, expenses.length ? ((totals[name] || 0) / Math.max(...expenses.map((e) => Number(e.amount || 0)), 1)) * 100 : 0)}%` }} /></div></div>)}
      </div>
    </>
  );
}
export default Categories;

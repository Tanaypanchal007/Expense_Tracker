import { useEffect, useMemo, useState } from "react";
import { ChartNoAxesCombined } from "lucide-react";
import PageHeading from "../components/PageHeading.jsx";
import { getExpenses } from "../services/api.js";

function Reports() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getExpenses().then(setExpenses).catch(() => {}).finally(() => setLoading(false)); }, []);
  const rows = useMemo(() => {
    const map = {};
    expenses.forEach((expense) => { map[expense.category] = (map[expense.category] || 0) + Number(expense.amount || 0); });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [expenses]);
  const total = rows.reduce((sum, row) => sum + row[1], 0);
  const money = (value) => `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
  return <>
    <PageHeading eyebrow="Your money at a glance" title="Spending Report" description="A simple breakdown of recorded spending by category." />
    <div className="mb-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white"><div className="flex items-center gap-3"><ChartNoAxesCombined size={26} /><p className="text-sm text-emerald-50">Total recorded spending</p></div><p className="mt-3 text-3xl font-extrabold">{money(total)}</p><p className="mt-2 text-sm text-emerald-50">{expenses.length} transactions across {rows.length} categories</p></div>
    <section className="rounded-2xl border border-slate-200 bg-white p-6"><h3 className="text-lg font-semibold text-slate-900">Category breakdown</h3>{loading ? <p className="py-8 text-slate-500">Loading report...</p> : rows.length === 0 ? <p className="py-8 text-sm text-slate-500">Add expenses to generate your report.</p> : <div className="mt-5 space-y-5">{rows.map(([category, amount]) => <div key={category}><div className="mb-2 flex justify-between gap-4 text-sm"><span className="font-medium text-slate-700">{category}</span><span className="font-semibold text-slate-900">{money(amount)} <span className="ml-1 text-xs font-normal text-slate-400">{total ? `${Math.round(amount / total * 100)}%` : "0%"}</span></span></div><div className="h-2.5 rounded-full bg-slate-100"><div className="h-2.5 rounded-full bg-emerald-500" style={{ width: `${total ? amount / total * 100 : 0}%` }} /></div></div>)}</div>}</section>
  </>;
}
export default Reports;

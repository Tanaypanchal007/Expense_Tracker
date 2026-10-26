import { Pencil, Trash2, ShoppingBag, ReceiptText, Utensils, Car, GraduationCap, HeartPulse, CircleDollarSign } from "lucide-react";

const categoryIcons = {
  Food: Utensils,
  Travel: Car,
  Shopping: ShoppingBag,
  Bills: ReceiptText,
  Education: GraduationCap,
  Health: HeartPulse,
  Other: CircleDollarSign,
};

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
function money(amount) {
  return `₹${Number(amount || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

function ExpenseTable({ expenses, onEdit, onDelete, compact = false }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-7">
        <div><h2 className="text-lg font-semibold text-slate-900">{compact ? "Recent Expenses" : "All Expenses"}</h2><p className="mt-1 text-sm text-slate-500">{compact ? "Your latest expense transactions" : "Your recorded transactions appear here."}</p></div>
        <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">{expenses.length} {expenses.length === 1 ? "record" : "records"}</span>
      </div>
      {expenses.length === 0 ? (
        <div className="px-6 py-14 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500"><ReceiptText size={23} /></div><h3 className="mt-4 font-semibold text-slate-900">No expenses yet</h3><p className="mt-1 text-sm text-slate-500">Add your first expense to see it here.</p></div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500"><tr><th className="px-6 py-4">Expense</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Date</th><th className="px-6 py-4 text-right">Amount</th>{!compact && <th className="px-6 py-4 text-right">Actions</th>}</tr></thead>
            <tbody className="divide-y divide-slate-100">
              {expenses.map((expense) => {
                const Icon = categoryIcons[expense.category] || CircleDollarSign;
                return <tr key={expense._id} className="transition hover:bg-slate-50/70">
                  <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><Icon size={20} /></div><div><p className="font-semibold text-slate-900">{expense.title}</p>{expense.note && <p className="mt-0.5 max-w-xs truncate text-xs text-slate-400">{expense.note}</p>}</div></div></td>
                  <td className="px-6 py-4"><span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700">{expense.category}</span></td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">{formatDate(expense.date || expense.createdAt)}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-right font-semibold text-slate-900">{money(expense.amount)}</td>
                  {!compact && <td className="px-6 py-4"><div className="flex justify-end gap-2"><button onClick={() => onEdit(expense)} title="Edit expense" className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600"><Pencil size={18} /></button><button onClick={() => onDelete(expense._id)} title="Delete expense" className="rounded-lg p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={18} /></button></div></td>}
                </tr>;
              })}
            </tbody>
          </table>
        </div>
      )}
      <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-4 text-sm text-slate-500">Showing {expenses.length} {compact ? "expenses" : "recorded expenses"}</div>
    </section>
  );
}

export default ExpenseTable;

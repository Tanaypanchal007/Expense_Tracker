import { useEffect, useState } from "react";
import { X } from "lucide-react";

const emptyForm = {
  title: "",
  category: "Food",
  amount: "",
  date: new Date().toISOString().slice(0, 10),
  note: "",
};

const categories = ["Food", "Travel", "Shopping", "Bills", "Education", "Health", "Entertainment", "Other"];

function ExpenseModal({ open, onClose, onSave, initialExpense }) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(initialExpense ? {
        title: initialExpense.title || "",
        category: initialExpense.category || "Food",
        amount: String(initialExpense.amount ?? ""),
        date: initialExpense.date ? new Date(initialExpense.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
        note: initialExpense.note || "",
      } : emptyForm);
      setError("");
    }
  }, [open, initialExpense]);

  if (!open) return null;

  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (!form.title.trim() || !form.category || Number(form.amount) <= 0) {
      setError("Please enter a title, category, and amount greater than zero.");
      return;
    }
    try {
      setSaving(true);
      await onSave({ ...form, amount: Number(form.amount) });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save this expense. Check the API connection.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <div><h2 className="text-xl font-bold text-slate-900">{initialExpense ? "Edit expense" : "Add expense"}</h2><p className="mt-1 text-sm text-slate-500">Enter the details of your transaction.</p></div>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Close"><X size={20} /></button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Expense name
            <input name="title" value={form.title} onChange={change} placeholder="e.g. House Rent" className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-emerald-500" />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">Category
              <select name="category" value={form.category} onChange={change} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-emerald-500">
                {categories.map((category) => <option key={category}>{category}</option>)}
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-700">Amount (₹)
              <input name="amount" type="number" min="0.01" step="0.01" value={form.amount} onChange={change} placeholder="0.00" className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-emerald-500" />
            </label>
          </div>
          <label className="block text-sm font-medium text-slate-700">Date
            <input name="date" type="date" value={form.date} onChange={change} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-emerald-500" />
          </label>
          <label className="block text-sm font-medium text-slate-700">Note (optional)
            <textarea name="note" value={form.note} onChange={change} rows="2" placeholder="Add a short note..." className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-emerald-500" />
          </label>
          {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
            <button disabled={saving} className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60">{saving ? "Saving..." : initialExpense ? "Save changes" : "Add expense"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpenseModal;

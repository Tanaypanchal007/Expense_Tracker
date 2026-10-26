import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ExpenseModal from "../components/ExpenseModal.jsx";
import PageHeading from "../components/PageHeading.jsx";
import { createExpense } from "../services/api.js";

function AddExpense() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const save = async (data) => { await createExpense(data); navigate("/expenses"); };
  return <><PageHeading title="Add Expense" description="Record a new transaction to keep your spending organized." /><div className="rounded-2xl border border-slate-200 bg-white p-8 text-center"><p className="text-slate-600">Use the form to record a new expense.</p><button onClick={() => setOpen(true)} className="mt-4 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700">Open expense form</button></div><ExpenseModal open={open} onClose={() => { setOpen(false); navigate("/expenses"); }} onSave={save} /></>;
}
export default AddExpense;

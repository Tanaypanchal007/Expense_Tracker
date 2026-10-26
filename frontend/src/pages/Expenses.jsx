import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import ExpenseTable from "../components/ExpenseTable.jsx";
import ExpenseModal from "../components/ExpenseModal.jsx";
import PageHeading from "../components/PageHeading.jsx";
import { getExpenses, createExpense, updateExpense, deleteExpense } from "../services/api.js";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const load = async () => {
    try { setExpenses(await getExpenses()); }
    catch (error) { alert("Could not load expenses. Please check the backend connection."); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const filtered = expenses.filter((expense) => {
    const matchesQuery = expense.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All" || expense.category === category;
    return matchesQuery && matchesCategory;
  });

  const save = async (data) => {
    if (selectedExpense) {
      const updated = await updateExpense(selectedExpense._id, data);
      setExpenses((items) => items.map((item) => item._id === updated._id ? updated : item));
    } else {
      const created = await createExpense(data);
      setExpenses((items) => [created, ...items]);
    }
    setSelectedExpense(null);
  };

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      await deleteExpense(id);
      setExpenses((items) => items.filter((item) => item._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Could not delete expense.");
    }
  };

  const openAdd = () => { setSelectedExpense(null); setModalOpen(true); };
  return (
    <>
      <PageHeading title="All Expenses" description="Keep track of where your money goes." action={<button onClick={openAdd} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"><Plus size={18} /> Add Expense</button>} />
      <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by expense name..." className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-500"><option>All</option>{["Food","Travel","Shopping","Bills","Education","Health","Entertainment","Other"].map((item) => <option key={item}>{item}</option>)}</select>
      </div>
      {loading ? <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500">Loading expenses...</div> : <ExpenseTable expenses={filtered} onEdit={(expense) => { setSelectedExpense(expense); setModalOpen(true); }} onDelete={remove} />}
      <ExpenseModal open={modalOpen} onClose={() => { setModalOpen(false); setSelectedExpense(null); }} onSave={save} initialExpense={selectedExpense} />
    </>
  );
}
export default Expenses;

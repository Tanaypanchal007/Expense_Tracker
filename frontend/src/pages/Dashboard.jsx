import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Wallet, TrendingUp, ReceiptText, Plus } from "lucide-react";
import SummaryCard from "../components/SummaryCard.jsx";
import ExpenseTable from "../components/ExpenseTable.jsx";
import ExpenseModal from "../components/ExpenseModal.jsx";
import PageHeading from "../components/PageHeading.jsx";
import { getExpenses, createExpense, updateExpense, deleteExpense } from "../services/api.js";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [pageError, setPageError] = useState("");

  const loadExpenses = async () => {
    try {
      setPageError("");
      setExpenses(await getExpenses());
    } catch (error) {
      setPageError("Could not load expenses. Check that the backend and MongoDB are running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadExpenses(); }, []);

  const total = useMemo(() => expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0), [expenses]);
  const highest = useMemo(() => expenses.length ? Math.max(...expenses.map((item) => Number(item.amount || 0))) : 0, [expenses]);
  const formatMoney = (value) => `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

  const saveExpense = async (data) => {
    if (selectedExpense) {
      const updated = await updateExpense(selectedExpense._id, data);
      setExpenses((current) => current.map((item) => item._id === updated._id ? updated : item).sort((a, b) => new Date(b.date) - new Date(a.date)));
    } else {
      const created = await createExpense(data);
      setExpenses((current) => [created, ...current]);
    }
    setSelectedExpense(null);
  };

  const removeExpense = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      await deleteExpense(id);
      setExpenses((current) => current.filter((item) => item._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Could not delete expense. Please try again.");
    }
  };

  const openAdd = () => { setSelectedExpense(null); setModalOpen(true); };
  const openEdit = (expense) => { setSelectedExpense(expense); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setSelectedExpense(null); };

  return (
    <>
      <PageHeading title="Dashboard" description="Track and manage your expenses" action={<button onClick={openAdd} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"><Plus size={18} /> Add Expense</button>} />
      {pageError && <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{pageError}</div>}
      <div className="mb-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <SummaryCard title="Total Expenses" value={formatMoney(total)} icon={Wallet} iconBg="bg-blue-50" iconColor="text-blue-600" description="All time expenses" />
        <SummaryCard title="Highest Expense" value={formatMoney(highest)} icon={TrendingUp} iconBg="bg-orange-50" iconColor="text-orange-600" description="Highest transaction" />
        <SummaryCard title="Transactions" value={expenses.length} icon={ReceiptText} iconBg="bg-emerald-50" iconColor="text-emerald-600" description="Total transactions" />
      </div>
      {loading ? <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500">Loading expenses...</div> : <ExpenseTable expenses={expenses.slice(0, 5)} compact />}
      <div className="mt-4 text-right"><Link to="/expenses" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">View all expenses →</Link></div>
      <ExpenseModal open={modalOpen} onClose={closeModal} onSave={saveExpense} initialExpense={selectedExpense} />
    </>
  );
}
export default Dashboard;

function SummaryCard({ title, value, description, icon: Icon, iconBg = "bg-emerald-50", iconColor = "text-emerald-600" }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div><p className="text-sm font-medium text-slate-500">{title}</p><p className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{value}</p></div>
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconBg} ${iconColor}`}>{Icon && <Icon size={23} />}</div>
      </div>
      <p className="mt-5 flex items-center gap-2 text-sm font-medium text-emerald-600"><span>↗</span>{description}</p>
    </div>
  );
}
export default SummaryCard;

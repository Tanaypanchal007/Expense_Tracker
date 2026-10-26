function PageHeading({ eyebrow, title, description, action }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>{eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">{eyebrow}</p>}<h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>{description && <p className="mt-2 text-sm text-slate-500 sm:text-base">{description}</p>}</div>
      {action}
    </div>
  );
}
export default PageHeading;

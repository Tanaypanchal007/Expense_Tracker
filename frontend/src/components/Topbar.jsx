import { Bell, UserRound } from "lucide-react";

function Topbar({ title, subtitle }) {
  return (
    <header className="sticky top-0 z-20 flex h-[88px] items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur sm:px-8">
      <div>
        <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">{title}</h1>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label="Notifications">
          <Bell size={22} /><span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-rose-500" />
        </button>
        <div className="hidden h-12 w-px bg-slate-200 sm:block" />
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600"><UserRound size={23} /></div>
          <span className="hidden font-medium text-slate-800 sm:inline">Tanay</span>
        </div>
      </div>
    </header>
  );
}

export default Topbar;

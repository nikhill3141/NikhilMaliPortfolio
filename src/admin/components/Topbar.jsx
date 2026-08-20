import { Bell, Search } from "lucide-react";

const Topbar = () => {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="hidden items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 md:flex md:w-72">
          <Search size={16} className="text-zinc-400" />

          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
          />
        </div>

        {/* Right */}
        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            className="relative rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            <Bell size={18} strokeWidth={1.8} />

            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-zinc-900" />
          </button>

          <div className="h-8 w-8 rounded-full bg-zinc-900 text-center text-xs font-medium leading-8 text-white">
            NM
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;

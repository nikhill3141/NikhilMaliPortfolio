import { Bell, Search } from "lucide-react";

const Topbar = () => {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">


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

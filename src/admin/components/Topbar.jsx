import { Bell } from "lucide-react";

const Topbar = () => {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-zinc-200 bg-white/90 backdrop-blur transition-colors dark:border-zinc-800 dark:bg-zinc-900/90">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">


        {/* Right */}
        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
          >
            <Bell size={18} strokeWidth={1.8} />

            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
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

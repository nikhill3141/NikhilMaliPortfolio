import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const ThemeOption = ({ active, icon: Icon, label, description, onClick }) => (
  <button
    type="button"
    role="radio"
    aria-checked={active}
    onClick={onClick}
    className={
      active
        ? "relative flex w-full items-start gap-3 rounded-lg border border-zinc-900 bg-zinc-950 p-4 text-left text-white transition dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950"
        : "relative flex w-full items-start gap-3 rounded-lg border border-zinc-200 bg-white p-4 text-left text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
    }
  >
    <span className={active ? "mt-0.5 text-current" : "mt-0.5 text-zinc-500 dark:text-zinc-400"}>
      <Icon size={19} />
    </span>
    <span>
      <span className="block text-sm font-semibold">{label}</span>
      <span className={active ? "mt-1 block text-xs text-white/70 dark:text-zinc-600" : "mt-1 block text-xs text-zinc-500 dark:text-zinc-400"}>
        {description}
      </span>
    </span>
    {active && <Check size={17} className="absolute right-4 top-4" />}
  </button>
);

const Settings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Settings
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Manage your content studio preferences.
        </p>
      </div>

      <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Monitor size={18} className="text-zinc-500 dark:text-zinc-400" />
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Appearance
            </h2>
          </div>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Choose the display mode for the admin workspace.
          </p>
        </div>

        <div className="p-5">
          <div role="radiogroup" aria-label="Color theme" className="grid gap-3 sm:grid-cols-2">
            <ThemeOption
              active={theme === "light"}
              icon={Sun}
              label="Light"
              description="A bright, clear workspace."
              onClick={() => setTheme("light")}
            />
            <ThemeOption
              active={theme === "dark"}
              icon={Moon}
              label="Dark"
              description="A quieter canvas for focused writing."
              onClick={() => setTheme("dark")}
            />
          </div>

          <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-500">
            Your selection is saved on this device.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Settings;

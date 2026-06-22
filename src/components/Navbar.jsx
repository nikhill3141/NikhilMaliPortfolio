import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { playClickSound } from '../utils/playClickSound';

export default function Navbar({ activeSection, items, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme ? savedTheme === 'dark' : prefersDark;

    document.documentElement.classList.toggle('dark', shouldUseDark);
    setIsDark(shouldUseDark);
  }, []);

  const handleThemeToggle = () => {
    const nextTheme = !document.documentElement.classList.contains('dark');

    document.documentElement.classList.toggle('dark', nextTheme);
    localStorage.setItem('theme', nextTheme ? 'dark' : 'light');
    setIsDark(nextTheme);
    playClickSound();
  };

  return (
    <header className="sticky top-0 z-50 mx-auto w-full max-w-3xl px-4 pt-3 sm:px-6">
      <nav className="rounded-md bg-[var(--background)]/85 py-3 backdrop-blur-sm">
        <div className="flex items-center justify-between px-2 sm:px-4">
          <div className="flex items-baseline gap-4">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onNavigate('home');
              }}
              className="text-base font-bold underline-offset-4 transition hover:underline"
            >
              Nikhil Mali
            </button>

            <ul className="hidden items-center gap-4 text-sm font-medium md:flex">
              {items.map((item) => (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      onNavigate(item.key);
                    }}
                    className={`underline-offset-4 transition hover:underline ${
                      activeSection === item.key
                        ? 'font-bold text-[var(--foreground)] decoration-2 underline'
                        : 'text-secondary'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle dark and light theme"
              onClick={handleThemeToggle}
              className="sleek-button h-9 w-9 p-0"
              type="button"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <button
              aria-label="Toggle navigation menu"
              className="sleek-button h-9 w-9 p-0 md:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              type="button"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden md:hidden"
            >
              <ul className="mt-4 flex flex-col gap-3 border-t border-[var(--border)] px-2 pt-4 text-base sm:px-4">
                {items.map((item) => (
                  <li key={item.key}>
                    <button
                      type="button"
                      onClick={() => {
                        playClickSound();
                        onNavigate(item.key);
                        setMenuOpen(false);
                      }}
                      className={`block py-1 text-left underline-offset-4 transition hover:underline ${
                        activeSection === item.key ? 'font-bold' : 'text-secondary'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

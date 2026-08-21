import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, MoonIcon, SunIcon, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { playClickSound } from '../utils/playClickSound';

export default function Navbar({ items }) {
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
      <nav className="rounded-md bg-[var(--background)]/85 py-1 backdrop-blur-sm">
        <div className="flex items-center justify-between px-2 sm:px-4">
          <div className="flex items-baseline gap-4">
            <ul className="hidden items-center gap-4 text-sm font-medium md:flex">
              {items.map((item) => (
                <li key={item.key}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    onClick={playClickSound}
                    className={({ isActive }) =>
                      `underline-offset-4 transition hover:underline ${
                        isActive
                          ? 'font-bold text-[var(--foreground)] decoration-2 underline'
                          : 'text-secondary'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle dark and light theme"
              onClick={handleThemeToggle}
              className="h-9 w-9 p-0"
            >
              {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
            </button>

            <button
              aria-label="Toggle navigation menu"
              className=" h-9 w-9 p-0 md:hidden"
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
              initial={{ right: 1, opacity: 0 }}
              animate={{ right: 'auto', opacity: 1 }}
              exit={{ right: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden md:hidden"
            >
              <ul className="mt-4 flex flex-col gap-3 border-t border-[var(--border)] px-2 pt-4 text-base sm:px-4">
                {items.map((item) => (
                  <li key={item.key}>
                    <NavLink
                      to={item.path}
                      end={item.path === '/'}
                      onClick={() => {
                        playClickSound();
                        setMenuOpen(false);
                      }}
                      className={({ isActive }) =>
                        `block py-1 text-left underline-offset-4 transition hover:underline ${
                          isActive ? 'font-bold' : 'text-secondary'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
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
import { useEffect, useMemo, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { playClickSound } from '../utils/playClickSound';

const navLinks = [
  { to: '#home', label: 'Home' },
  { to: '#about', label: 'About' },
  { to: '#projects', label: 'Projects' },
  { to: '#youtube', label: 'Videos' },
  { to: '#blogs', label: 'Blogs' },
  { to: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const [isDark, setIsDark] = useState(false);

  const linksById = useMemo(
    () => navLinks.map((link) => ({ ...link, id: link.to.slice(1) })),
    []
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme ? savedTheme === 'dark' : prefersDark;

    document.documentElement.classList.toggle('dark', shouldUseDark);
    setIsDark(shouldUseDark);
  }, []);

  useEffect(() => {
    const sections = linksById
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.22, rootMargin: '-20% 0px -45% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [linksById]);

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
          <div className="flex items-center gap-4">
            <a
              href="#home"
              onClick={playClickSound}
              className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-md border border-[var(--border)] bg-blue-300 transition duration-300 hover:scale-95 dark:bg-yellow-300"
              aria-label="Go to home"
            >
              <img
                src="/NM Tech Logo.png"
                alt="NM"
                className="h-full w-full object-cover"
              />
            </a>

            <ul className="hidden items-center gap-4 text-sm font-medium md:flex">
              {linksById.map((link) => (
                <li key={link.to}>
                  <a
                    href={link.to}
                    onClick={playClickSound}
                    className={`underline-offset-4 transition hover:underline ${
                      activeId === link.id
                        ? 'font-bold text-[var(--foreground)] decoration-2 underline'
                        : 'text-secondary'
                    }`}
                  >
                    {link.label}
                  </a>
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
                {linksById.map((link) => (
                  <li key={link.to}>
                    <a
                      href={link.to}
                      onClick={() => {
                        playClickSound();
                        setMenuOpen(false);
                      }}
                      className={`block py-1 underline-offset-4 transition hover:underline ${
                        activeId === link.id ? 'font-bold' : 'text-secondary'
                      }`}
                    >
                      {link.label}
                    </a>
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

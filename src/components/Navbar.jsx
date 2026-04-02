import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { playClickSound } from '../utils/playClickSound';

const navLinks = [
  { to: '#home', label: 'Home' },
  { to: '#projects', label: 'Projects' },
  { to: '#youtube', label: 'YouTube' },
  { to: '#blogs', label: 'Blogs' },
  { to: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [isDark, setIsDark] = useState(true);

  const linksById = useMemo(
    () => navLinks.map((link) => ({ ...link, id: link.to.slice(1) })),
    []
  );

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    
    if (shouldUseDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    setIsDark(shouldUseDark);
  }, []);

  // Active section observer
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
      { threshold: 0.2, rootMargin: '-20% 0px -40% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [linksById]);

  // Theme toggle
  const handleThemeToggle = () => {
    const html = document.documentElement;
    const currentTheme = html.classList.contains('dark');
    const nextTheme = !currentTheme;
    
    if (nextTheme) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    setIsDark(nextTheme);
    playClickSound();
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-slate-200/40 bg-white/70 text-slate-900 shadow-md backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80 dark:text-white font-sans">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 sm:px-8 md:px-12 lg:px-16">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-2xl"
        >
          <a
            href="#home"
            onClick={playClickSound}
            className="transition hover:text-blue-400"
          >
            NM
          </a>
        </motion.div>

        {/* Desktop Menu */}
        <ul className="hidden items-center space-x-7 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
          {linksById.map((link) => (
            <li key={link.to}>
              <a
                href={link.to}
                onClick={playClickSound}
                className={`relative px-1 py-2 transition duration-300 hover:text-slate-900 dark:hover:text-white ${
                  activeId === link.id
                    ? 'font-semibold text-slate-900 dark:text-white'
                    : ''
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-[-4px] left-0 h-[3px] bg-slate-900 dark:bg-slate-100 rounded-full transition-all duration-300 ${
                    activeId === link.id ? 'w-full' : 'w-0'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            aria-label="Toggle dark and light theme"
            onClick={handleThemeToggle}
            className="rounded-full border border-slate-300 p-2 transition text-slate-700 hover:border-slate-400 dark:border-slate-600 dark:text-slate-100 dark:hover:border-slate-500"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-700 dark:text-slate-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white text-slate-800 dark:bg-black/90 dark:text-white px-6 pb-6 md:hidden"
          >
            <ul className="flex flex-col space-y-4 mt-4 text-lg text-slate-700 dark:text-slate-200">
              {linksById.map((link) => (
                <li key={link.to}>
                  <a
                    href={link.to}
                    onClick={() => {
                      playClickSound();
                      setMenuOpen(false);
                    }}
                    className={`block py-2 transition ${
                      activeId === link.id
                        ? 'font-semibold text-slate-900 dark:text-white'
                        : 'text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white'
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
  );
}
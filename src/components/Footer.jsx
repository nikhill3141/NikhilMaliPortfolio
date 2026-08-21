import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  ArrowUp,
  ArrowUpRight,
  Code2,
} from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/your-username",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nikhil-mali-aa878a236/",
    icon: Linkedin,
  },
  {
    label: "Twitter",
    href: "https://twitter.com/your-handle",
    icon: Twitter,
  },
  {
    label: "Email",
    href: "mailto:you@example.com",
    icon: Mail,
  },
];

const quote = {
  text: "You never be perfect. Build, Contribute and Learn every day!",
  author: "Nikhil Mali",
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.footer
      className="relative mt-24 border-t border-white/10"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Subtle gradient hairline */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Same width as navbar */}
      <div className="mx-auto w-full max-w-3xl px-4 pt-3 sm:px-6">
        {/* ================= CTA ================= */}
        <div className="flex flex-col items-center py-14 text-center sm:py-16">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white/50" />

            <p className="text-sm text-secondary">Got an idea?</p>
          </div>

          <a
            href="mailto:nikhilmali3141@gmail.com"
            className="group inline-flex items-center gap-2 text-2xl font-bold transition-colors duration-200 hover:text-white sm:text-4xl"
          >
            <span>Let&apos;s build something remarkable</span>

            <ArrowUpRight
              size={28}
              className="shrink-0 text-white/70 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* ================= QUOTE ================= */}
        <div className="mb-12">
          <div className="relative isolate min-h-[220px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] px-6 py-8 shadow-[0_0_60px_rgba(255,255,255,0.025)] sm:px-10 sm:py-10">
            {/* Subtle top highlight */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-px w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            {/* Soft background glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-40 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-3xl" />

            {/* ================= BIG OPEN QUOTE ================= */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-2 -top-10 select-none font-serif text-[190px] font-bold leading-none text-white/[0.045] sm:-left-1 sm:-top-14 sm:text-[230px]"
            >
              “
            </span>

            {/* ================= BIG CLOSE QUOTE ================= */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -right-2 select-none font-serif text-[190px] font-bold leading-none text-white/[0.045] sm:-bottom-32 sm:-right-1 sm:text-[230px]"
            >
              ”
            </span>

            {/* Quote content */}
            <div className="relative z-10 flex min-h-[150px] flex-col items-center justify-center text-center">

              {/* Quote */}
              <blockquote className="max-w-2xl font-mono text-sm leading-7 text-secondary sm:text-base sm:leading-8">
                <span className="mr-1 text-lg font-bold text-white/70 sm:text-xl">
                  “
                </span>

                {quote.text}

                <span className="ml-1 text-lg font-bold text-white/70 sm:text-xl">
                  ”
                </span>
              </blockquote>

              {/* Author */}
              <p className="mt-4 text-xs text-secondary/50">— {quote.author}</p>
            </div>
          </div>
        </div>

        {/* ================= LINKS ================= */}
        <div className="grid grid-cols-1 gap-10 border-t border-white/10 py-10 sm:grid-cols-2 sm:gap-16">
          {/* Sitemap */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/50" />

              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-secondary/60">
                Sitemap
              </p>
            </div>

            <nav className="grid w-full max-w-xs grid-cols-2 gap-x-8 gap-y-3 sm:max-w-none">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group flex items-center justify-between border-b border-white/10 pb-2 text-sm text-secondary transition-colors duration-200 hover:border-white/30 hover:text-white"
                >
                  <span>{link.label}</span>

                  <ArrowUpRight
                    size={14}
                    className="opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/50" />

              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-secondary/60">
                Connect
              </p>
            </div>

            <div className="flex items-center gap-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ================= BACK TO TOP ================= */}
        <div className="flex justify-center border-t border-white/10 py-8">
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 transition-all duration-200 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
          >
            <ArrowUp
              size={16}
              className="transition-transform duration-200 group-hover:-translate-y-0.5"
            />
          </button>
        </div>

        {/* ================= COPYRIGHT ================= */}
        <div className="pb-8 pt-1 text-center">
          <p className="text-xs text-secondary/40">
            © {new Date().getFullYear()} Nikhil. Crafted with intention, HandMade
          </p>
        </div>
      </div>
    </motion.footer>
  );
}

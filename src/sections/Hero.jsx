import { Bot, Code2, Download, Mail, Sparkles } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { playClickSound } from '../utils/playClickSound';

const skills = [
  { icon: Code2, label: 'React' },
  { icon: Code2, label: 'Node.js' },
  { icon: Code2, label: 'MongoDB' },
  { icon: Bot, label: 'AI Agents' },
  { icon: Sparkles, label: 'UI/UX' },
];

const socials = [
  { href: 'https://github.com/nikhill3141', label: 'GitHub', icon: FaGithub },
  {
    href: 'https://www.linkedin.com/in/nikhil-mali-aa878a236/',
    label: 'LinkedIn',
    icon: FaLinkedin,
  },
  { href: 'https://www.instagram.com/nikhilmali3141/', label: 'Instagram', icon: FaInstagram },
];

export default function Hero() {
  return (
    <section id="home" className="animate-fade-in-blur pt-10">
      <motion.img
        src="/linkedInprofile-removebg.png"
        alt="Nikhil Mali"
        className="h-24 w-24 rounded-full bg-yellow-300 object-contain"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      />

      <div className="mt-8 flex flex-col gap-2">
        <motion.h1
          className="text-4xl font-bold leading-tight sm:text-5xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          Hi, I'm Nikhil Mali -{' '}
          <span className="text-secondary">A Full Stack Developer.</span>
        </motion.h1>

        <motion.div
          className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-base leading-8 text-secondary sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
        >
          <span>I build readable web apps using</span>
          {skills.slice(0, 3).map((skill) => {
            const Icon = skill.icon;
            return (
              <span
                key={skill.label}
                className="sleek-chip inline-flex items-center gap-1.5 px-2 py-1 text-sm font-bold text-[var(--foreground)]"
              >
                <Icon size={14} />
                {skill.label}
              </span>
            );
          })}
          <span>with a focus on clean APIs, UI polish, and useful automation.</span>
        </motion.div>
      </div>

      <motion.div
        className="mt-8 flex flex-wrap gap-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.24 }}
      >
        <a href="/NikhilMaliResume.pdf" download className="sleek-button">
          <Download size={16} />
          Resume / CV
        </a>
        <a href="#contact" onClick={playClickSound} className="sleek-button">
          <Mail size={16} />
          Get in touch
        </a>
      </motion.div>

      <motion.div
        className="mt-8 flex gap-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.32 }}
      >
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary transition hover:text-[var(--foreground)]"
              aria-label={social.label}
              title={social.label}
            >
              <Icon size={22} />
            </a>
          );
        })}
      </motion.div>
    </section>
  );
}

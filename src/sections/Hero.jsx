import { Bot, Code, Code2, Database, Download, Globe, Mail, Sparkles, X, Zap } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaCss3, FaGithub, FaInstagram, FaLinkedin, FaNodeJs, FaReact, FaTwitter } from 'react-icons/fa';
import { playClickSound } from '../utils/playClickSound';

const skills = [
  { icon: <FaReact size={14} />, label: 'React' },
  { icon: <Code2 size={14} />, label: 'Next.js' },
  { icon: <FaNodeJs size={14} />, label: 'Node.js' },
  { icon: <Code size={14} />, label: 'tRPC' },
  { icon: <Globe size={14} />, label: 'REST APIs' },
  { icon: <Database size={14} />, label: 'PostgreSQL' },
  { icon: <Database size={14} />, label: 'MongoDB' },
  { icon: <Bot size={14} />, label: 'AI Agents' },
  { icon: <Sparkles size={14} />, label: 'UI/UX' },
  { icon: <FaCss3 size={14} />, label: 'Tailwind CSS' },
  { icon: <Zap size={14} />, label: 'Framer Motion' },
  { icon: <FaGithub size={14} />, label: 'Git & GitHub' },
];

const socials = [
  { href: 'https://github.com/nikhill3141', label: 'GitHub', icon: FaGithub },
  {
    href: 'https://www.linkedin.com/in/nikhil-mali-aa878a236/',
    label: 'LinkedIn',
    icon: FaLinkedin,
  },
  { href: 'https://www.instagram.com/nikhilmali3141/', label: 'Instagram', icon: FaInstagram },
  { href: 'https://x.com/NikhilMali7083', label: 'X', icon: FaTwitter },
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section data-section="home" className="animate-fade-in-blur pt-10 ">
      {/* img & title */}
      <div className="flex gap-4 justify-center items-center">
        <motion.img
          src="/linkedInprofile-removebg.png"
          alt="Nikhil Mali"
          className="h-24 w-24 rounded-full bg-yellow-300 object-contain"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        />

        <motion.h1
          className="text-4xl font-bold leading-tight sm:text-5xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          Hi, I'm Nikhil Mali{' '}
          <span className="text-secondary">A Full Stack Developer.</span>
        </motion.h1>
      </div>

      {/* tagline */}
      <motion.p
        className="mt-4 max-w-2xl text-base leading-8 text-secondary sm:text-lg"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.16 }}
      >
        I build scalable, AI-leveraged software for businesses, across a range of
        projects and technologies and I'm always Upgrade myself and exited to learn new technologies.
      </motion.p>

      {/* skills */}
      <motion.div
        className="mt-4 flex flex-wrap gap-2"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.22 }}
      >
        {skills.map((skill) => (
          <span
            key={skill.label}
            className="sleek-chip inline-flex items-center gap-1.5 px-2 py-1 text-sm font-bold text-[var(--foreground)]"
          >
            {skill.icon}
            {skill.label}
          </span>
        ))}
      </motion.div>

      {/* resume and getintouch btn */}
      <motion.div
        className="mt-8 flex flex-wrap gap-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.3 }}
      >
        <a onClick={playClickSound} href="Nikhil_Mali_Resume.pdf" download className="sleek-button">
          <Download size={16} />
          Resume
        </a>
        <button
          type="button"
          onClick={() => {
            playClickSound();
            navigate('/contact');
          }}
          className="sleek-button"
        >
          <Mail size={16} />
          Get in touch
        </button>
      </motion.div>

      {/* social icons links */}
      <motion.div
        className="mt-8 flex gap-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.38 }}
      >
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={socials.label}
              href={socials.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary transition hover:text-[var(--foreground)]"
              aria-label={socials.label}
              title={socials.label}
            >
              <Icon size={22} />
            </a>
          );
        })}
      </motion.div>
    </section>
  );
}
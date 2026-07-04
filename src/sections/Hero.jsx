import { Bot, Code, Code2, Database, Download, Mail, Sparkles } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaCss3, FaDatabase, FaGithub, FaInstagram, FaLinkedin, FaNodeJs, FaReact } from 'react-icons/fa';
import { playClickSound } from '../utils/playClickSound';

const skills = [
  { icon: <FaReact size={14} />, label: 'React' },
  { icon: <FaNodeJs size={14} />, label: 'Node.js' },
  { icon: <Code2 size={14} />, label: 'Next.js' },
  { icon: <Code size={14} />, label: 'tRPC' },
  { icon: <Database size={14} />, label: 'PostgresSQL' },
  { icon: <FaDatabase size={14} />, label: 'MongoDB' },
  { icon: <Bot size={14} />, label: 'AI Agents' },
  { icon: <Sparkles size={14} />, label: 'UI/UX' },
  { icon: <FaCss3 size={14} />, label: 'Tailwind CSS' },
  { icon: <FaGithub size={14} />, label: 'Git & Github' },

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

export default function Hero({ sectionRef, onNavigate }) {
  return (
    <section ref={sectionRef} data-section="home" className="animate-fade-in-blur pt-10 ">
      {/* img & title */}
      <div className="flex  gap-4 justify-center items-center">
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
          Hi, I'm Nikhil Mali {' '}
          <span className="text-secondary">A Full Stack Developer.</span>
        </motion.h1>
      </div>
      {/* discription and skills */}
      <motion.div
        className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-base leading-8 text-secondary sm:text-lg"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.16 }}
      >
        <span>I build scalable and efficient software solutions with laveraging AI for businesses. <br />
          Having experience with multiple projects and technologies. I like to update my skills and learn new technologies.
        </span>

        {skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <span
              key={skill.label}
              className="sleek-chip inline-flex items-center gap-1.5 px-2 py-1 text-sm font-bold text-[var(--foreground)]"
            >
              {skill.icon}
              {skill.label}
            </span>
          );
        })}

      </motion.div>
      {/* resume and getintouch btn */}
      <motion.div
        className="mt-8 flex flex-wrap gap-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.24 }}
      >
        <a onClick={playClickSound()} href="Nikhil_Mali_Resume.pdf" download className="sleek-button">
          <Download size={16} />
          Resume 
        </a>
        <button
          type="button"
          onClick={() => {
            playClickSound();
            onNavigate('contact');
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

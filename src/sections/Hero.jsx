import { Bot, Code2, LayoutPanelTop, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { playClickSound } from '../utils/playClickSound';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative px-4 "
    >
      <div className="absolute inset-0 -z-10 bg-neutral-20" />
      <div className="absolute inset-0 -z-10 opacity-50 dark:opacity-30 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.06),_transparent_55%)]" />
      
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
        </motion.div>

        <div className="mb-16 rounded-3xl border border-blue-300/30 p-6 shadow-xl backdrop-blur-sm bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:border-slate-700/60 dark:bg-slate-900/70 sm:p-10">
          <div className="flex w-full flex-col gap-12 lg:flex-row">
            <div className='flex flex-col items-center'>
              <motion.div
              className="flex h-64 w-64 flex-shrink-0  overflow-hidden rounded-[500px] bg-gradient-to-br from-yellow-300 to-yellow-300 shadow-2xl p-2"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <img src="linkedInprofile-removebg.png" alt="Nikhil Mali" className="h-full w-full object-contain rounded-2xl" />
              
            </motion.div>
            
              <div className="mt-6 flex  justify-center gap-4 text-xl text-blue-300 dark:text-slate-300 lg:justify-start">
                <a href="https://github.com/nikhill3141" target="_blank" rel="noopener noreferrer" className="transition hover:text-blue-400 dark:hover:text-blue-400">
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/nikhil-mali-aa878a236/" target="_blank" rel="noopener noreferrer" className="transition hover:text-blue-400 dark:hover:text-blue-400">
                  <FaLinkedin />
                </a>
                <a href="https://www.instagram.com/nikhilmali3141/" target="_blank" rel="noopener noreferrer" className="transition hover:text-pink-400 dark:hover:text-pink-400">
                  <FaInstagram />
                </a>
              </div>

            </div>


            <motion.div
              className="w-full text-center lg:text-left"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
            <h1 className="text-4xl font-semibold leading-tight text-white dark:text-slate-100 sm:text-5xl">
               Hi, I'm <span className="text-blue-400 dark:text-blue-400">Nikhil Mali</span> 
          </h1>
              <h2 className="mb-4 text-2xl font-semibold text-white dark:text-slate-400">Full Stack Developer</h2>

              <p className="mb-4 text-base leading-relaxed text-white dark:text-slate-300">
                I'm focused on building end-to-end products from REST APIs 
              </p>

              <p className="mb-4 text-base leading-relaxed text-white dark:text-slate-300">
                I work with <strong>MERN</strong> and modern API practices to design services that are clean, secure, and easy to maintain. On the frontend, I bring those capabilities to life using <strong>React</strong>, component-driven UI, and smooth animations with <strong>Framer Motion</strong>.
              </p>

              <p className="mb-6 text-base text-white dark:text-slate-400">
                I enjoy experimenting with <strong>AI agents</strong> and practical automation workflows—because great software should save time and reduce repetitive work.
              </p>

              <div className="mb-6 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: <LayoutPanelTop size={18} />, title: 'UI - UX', desc: 'Readable layouts + micro-interactions' },
                  { icon: <Code2 size={18} />, title: 'MERN', desc: 'APIs, dashboards, maintainable code' },
                  { icon: <Bot size={18} />, title: 'Automation', desc: 'Agent ideas turned into workflows' },
                  { icon: <Sparkles size={18} />, title: 'Scaling', desc: 'Consistency, spacing, and performance' },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 rounded-2xl border border-blue-300/30 dark:border-slate-700/40 bg-blue-500/10 dark:bg-slate-800 p-4"
                  >
                    <div className="mt-0.5 text-blue-300 dark:text-blue-400">{item.icon}</div>
                    <div>
                      <div className="text-sm font-semibold text-white dark:text-white">{item.title}</div>
                      <div className="text-sm text-blue-100 dark:text-slate-300">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                <a
                  href="#projects"
                  onClick={playClickSound}
                  className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  View Projects
                </a>
                <a
                  href="/NikhilMaliResume.pdf"
                  download
                  className="rounded-full border border-blue-500 px-6 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-500/10"
                >
                  Download Resume
                </a>
                <a
                  href="#contact"
                  onClick={playClickSound}
                  className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 dark:border-slate-600 dark:text-slate-200 dark:hover:border-slate-500"
                >
                  Get in Touch
                </a>
              </div>

            </motion.div>
          </div>
        </div>

        <motion.div
          className="grid gap-4 text-center sm:grid-cols-3 lg:grid-cols-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {[
            'REST APIs',
            'React',
            'Tailwind CSS',
            'Node.js',
            'PostgreSQL',
            'Git & GitHub',
            'Framer Motion',
            'AI Agents',
            'Performance',
          ].map((tech) => (
            <div
              key={tech}
              className="rounded-xl border border-blue-300/30 dark:border-slate-700/40 bg-blue-500/10 dark:bg-slate-800 px-4 py-3 text-sm font-semibold text-white dark:text-slate-200 shadow-sm"
            >
              {tech}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

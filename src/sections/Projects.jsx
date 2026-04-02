// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Instagram Clone',
    description:
      'A full-stack Instagram-style app with a focused UI/UX experience. It covers authentication, profiles, feed-style browsing, and a clean, modern component structure.',
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    link: 'https://insta-clone-made-by-nik.onrender.com',
    github: 'https://github.com/nikhill3141/instagram-clone',
    youtubeEmbed: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    highlights: ['User authentication & profiles', 'Real-time feed updates', 'Responsive design'],
  },
  {
    title: 'Harihar Institute Website',
    description:
      'A full-stack student dashboard that manages assignments, attendance/presence, and exam mark analysis. The goal is a clear, data-driven learning experience.',
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    link: 'https://harihar-institute.onrender.com',
    github: 'https://github.com/nikhill3141/harihar-institute',
    youtubeEmbed: 'https://www.youtube.com/embed/ysz5S6PUM-U',
    highlights: ['Assignment tracking', 'Attendance management', 'Analytics dashboard'],
  },
  {
    title: 'Camera Order Management',
    description:
      'A backend-focused customer management and order system. Built around clean CRUD operations and an analytics dashboard for quick decision-making.',
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    link: 'https://cameracustomermanagement.onrender.com',
    github: 'https://github.com/nikhill3141/camera-order-management',
    youtubeEmbed: 'https://www.youtube.com/embed/jNQXAC9IVRw',
    highlights: ['Customer management', 'Order tracking', 'Analytics insights'],
  },
  {
    title: 'TSP Salon Website',
    description:
      'A marketing website with an interactive quiz that helps users match haircare needs and get product suggestions. Designed to be engaging and conversion-friendly.',
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    link: 'https://tsp-salon.onrender.com',
    github: 'https://github.com/nikhill3141/tsp-salon',
    youtubeEmbed: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    highlights: ['Interactive quiz engine', 'Product recommendations', 'Lead generation'],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="min-h-[75vh] py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-black dark:text-slate-200 mb-4">
          My <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Projects</span>
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-sm md:text-base text-black dark:text-gray-300">
          Explore my portfolio of full-stack applications built with modern technologies. Each project showcases real-world problem-solving and clean code architecture.
        </p>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:gap-10">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.25 }}
              className="group relative flex flex-col h-full rounded-2xl md:rounded-3xl overflow-hidden bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 shadow-lg dark:shadow-lg dark:shadow-blue-500/10 transition-all duration-300 hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-blue-500/20 backdrop-blur-sm"
            >
              {/* Video Container */}
              <div className="relative overflow-hidden rounded-xl md:rounded-2xl border border-gray-200 dark:border-blue-400/20 bg-gray-100 dark:bg-black/40 m-4 md:m-6">
                <iframe
                  className="aspect-video w-full transition-transform duration-300 group-hover:scale-105"
                  src={project.youtubeEmbed}
                  title={`${project.title} demo video`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              {/* Content Container */}
              <div className="relative z-10 flex flex-col flex-grow px-4 md:px-6 py-2 md:py-3">
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-2 transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {project.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-700 dark:text-gray-400 mb-4 line-clamp-2 md:line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="mb-4 space-y-1">
                  {project.highlights.map((h) => (
                    <div
                      key={h}
                      className="flex items-center text-xs md:text-sm text-gray-600 dark:text-blue-200 font-medium"
                    >
                      <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-blue-600 dark:text-blue-400">
                        ✓
                      </span>
                      {h}
                    </div>
                  ))}
                </div>

                {/* Tech Stack Tags */}
                <div className="mb-5 flex flex-wrap gap-2">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-bold rounded-full border-2 border-blue-600 bg-transparent text-blue-600 dark:border-blue-400 dark:bg-transparent dark:text-blue-300 transition-all duration-300 hover:scale-105 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="relative z-10 mt-auto px-4 md:px-6 py-4 md:py-5 border-t border-gray-200 dark:border-blue-500/10 dark:bg-slate-800/50 flex gap-3 sm:gap-2 md:gap-3 flex-col sm:flex-row">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-transparent border border-blue-600 px-4 py-2.5 md:py-3 text-xs md:text-sm font-bold text-blue-700 transition-all duration-200 hover:scale-105 active:scale-95 dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-500 dark:text-white dark:border-blue-500 dark:shadow-lg"
                >
                  <svg className="w-4 h-4 stroke-blue-700 dark:stroke-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="hidden sm:inline">Preview</span>
                  <span className="sm:hidden">Live</span>
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 bg-transparent px-4 py-2.5 md:py-3 text-xs md:text-sm font-bold text-blue-600 transition-all duration-200 hover:scale-105 active:scale-95 dark:border-blue-400 dark:text-blue-300 dark:bg-transparent dark:hover:bg-blue-500/10 dark:shadow-lg"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="hidden sm:inline">GitHub</span>
                  <span className="sm:hidden">Code</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

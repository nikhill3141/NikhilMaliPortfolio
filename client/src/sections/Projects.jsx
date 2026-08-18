// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { CheckCircle2, ExternalLink, Github, PlayCircle } from 'lucide-react';

const projects = [
  {
    title: 'Instagram Clone',
    description:
      'A full-stack Instagram-style app with authentication, profiles, feed browsing, and a clean component structure.',
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    link: 'https://insta-clone-made-by-nik.onrender.com',
    github: 'https://github.com/nikhill3141/instagram-clone',
    youtubeEmbed: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    highlights: ['User authentication & profiles', 'Feed-style browsing', 'Responsive design'],
  },
  {
    title: 'Harihar Institute Website',
    description:
      'A student dashboard for assignments, attendance, and exam mark analysis with a clear data-driven experience.',
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    link: 'https://harihar-institute.onrender.com',
    github: 'https://github.com/nikhill3141/harihar-institute',
    youtubeEmbed: 'https://www.youtube.com/embed/ysz5S6PUM-U',
    highlights: ['Assignment tracking', 'Attendance management', 'Analytics dashboard'],
  },
  {
    title: 'Camera Order Management',
    description:
      'A backend-focused customer and order management system with CRUD flows and quick analytics views.',
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    link: 'https://cameracustomermanagement.onrender.com',
    github: 'https://github.com/nikhill3141/camera-order-management',
    youtubeEmbed: 'https://www.youtube.com/embed/jNQXAC9IVRw',
    highlights: ['Customer records', 'Order tracking', 'Analytics insights'],
  },
  {
    title: 'TSP Salon Website',
    description:
      'A salon marketing site with an interactive quiz for matching haircare needs and product suggestions.',
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    link: 'https://tsp-salon.onrender.com',
    github: 'https://github.com/nikhill3141/tsp-salon',
    youtubeEmbed: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    highlights: ['Quiz engine', 'Product recommendations', 'Lead generation'],
  },
];

function SectionHeading({ subHeading, heading }) {
  return (
    <div>
      <p className="text-sm text-secondary">{subHeading}</p>
      <h2 className="text-2xl font-bold">{heading}</h2>
    </div>
  );
}

export default function Projects({ sectionRef }) {
  return (
    <section ref={sectionRef} data-section="projects" className="sleek-section">
      <SectionHeading subHeading="Featured" heading="Projects" />

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            viewport={{ once: true, amount: 0.25 }}
            className="sleek-card group flex h-full flex-col overflow-hidden transition-colors hover:border-[var(--foreground)]"
          >
            {/* <div className="relative aspect-video overflow-hidden border-b border-[var(--border)] bg-[var(--surface)]">
              <iframe
                className="h-full w-full"
                src={project.youtubeEmbed}
                title={`${project.title} demo video`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm">
                  <PlayCircle size={24} />
                </span>
              </div>
            </div> */}

            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold leading-tight">{project.title}</h3>
                <div className="flex shrink-0 items-center gap-2 text-secondary">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-[var(--foreground)]"
                    aria-label={`${project.title} live preview`}
                    title="View website"
                  >
                    <ExternalLink size={18} />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-[var(--foreground)]"
                    aria-label={`${project.title} source code`}
                    title="View GitHub"
                  >
                    <Github size={18} />
                  </a>
                </div>
              </div>

              <p className="mt-4 line-clamp-3 text-secondary">{project.description}</p>

              <div className="mt-4 space-y-2">
                {project.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-center gap-2 text-sm text-secondary">
                    <CheckCircle2 size={15} />
                    {highlight}
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((tag) => (
                  <span key={tag} className="sleek-chip px-2 py-1 text-xs font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

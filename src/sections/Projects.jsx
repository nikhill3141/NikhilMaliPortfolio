import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink, Github, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "NM Auth Service",
    description:
      "A reusable authentication and authorization service designed around modern OIDC and OAuth 2.0 standards, reducing the effort required to implement secure authentication.",
    tech: ["Node.js", "React", "Express.js", "OIDC", "OAuth 2.0", "JWT"],
    timeline: "June 2026 — Present",
    status: "In progress",
    type: "Authentication Service",
    link: "https://example.com",
    github: "https://github.com/your-username/nm-auth-service",
    highlights: [
      "Authentication & authorization",
      "OIDC-compliant authentication flow",
      "OAuth 2.0 & JWT security",
    ],
  },

  {
    title: "CalyM",
    description:
      "An AI-powered platform for managing meetings and emails through integrated AI agents, helping users automate repetitive communication workflows.",
    tech: [
      "React",
      "Node.js",
      "MongoDB",
      "Express.js",
      "Google API",
      "OpenAI API",
    ],
    timeline: "March 2026 — Present",
    status: "In progress",
    type: "AI Platform",
    link: "https://example.com",
    github: "https://github.com/your-username/calym",
    highlights: [
      "AI-powered meeting management",
      "Email automation",
      "Google API & OpenAI integration",
    ],
  },

  {
    title: "NM Forms",
    description:
      "A form-building platform for creating customized forms, collecting data through shareable links, and analyzing responses through a centralized dashboard.",
    tech: ["Next.js", "TypeScript", "tRPC", "PostgreSQL", "Monorepo"],
    timeline: "January 2026 — Present",
    status: "In progress",
    type: "SaaS Platform",
    link: "https://example.com",
    github: "https://github.com/your-username/nm-forms",
    highlights: [
      "Custom form builder",
      "Shareable data collection links",
      "Response analytics",
    ],
  },

  {
    title: "Harihar Institute Website",
    description:
      "A student management and analytics platform for assignments, attendance, payments, and examination performance with a data-driven dashboard.",
    tech: ["React", "Node.js", "Prisma", "PostgreSQL"],
    timeline: "2026",
    status: "Completed",
    type: "Student Management",
    link: "https://harihar-institute.onrender.com",
    github: "https://github.com/nikhill3141/harihar-institute",
    highlights: [
      "Assignment tracking",
      "Attendance management",
      "Exam & performance analytics",
    ],
  },

  {
    title: "Camera Order Management",
    description:
      "A customer and order management system designed to simplify customer records, order tracking, and operational analytics.",
    tech: ["MongoDB", "Express.js", "React", "Node.js"],
    timeline: "2025",
    status: "Completed",
    type: "Management System",
    link: "https://cameracustomermanagement.onrender.com",
    github: "https://github.com/nikhill3141/camera-order-management",
    highlights: ["Customer records", "Order tracking", "Analytics insights"],
  },

  {
    title: "TSP Salon Website",
    description:
      "A salon marketing platform with an interactive quiz that helps users identify their haircare needs and discover relevant product recommendations.",
    tech: ["MongoDB", "Express.js", "React", "Node.js"],
    timeline: "2025",
    status: "Completed",
    type: "Marketing Website",
    link: "https://tsp-salon.onrender.com",
    github: "https://github.com/nikhill3141/tsp-salon",
    highlights: [
      "Interactive quiz engine",
      "Product recommendations",
      "Lead generation",
    ],
  },

  {
    title: "Instagram Clone",
    description:
      "A full-stack social media application inspired by Instagram with authentication, profiles, feed browsing, and a responsive component-based interface.",
    tech: ["MongoDB", "Express.js", "React", "Node.js"],
    timeline: "2024",
    status: "Completed",
    type: "Full-stack Application",
    link: "https://insta-clone-made-by-nik.onrender.com",
    github: "https://github.com/nikhill3141/instagram-clone",
    highlights: [
      "User authentication & profiles",
      "Feed-style browsing",
      "Responsive design",
    ],
  },
];

function SectionHeading({ subHeading, heading }) {
  return (
    <div className="mb-10">
      <p className="text-sm text-secondary">{subHeading}</p>

      <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
        {heading}
      </h2>
    </div>
  );
}

export default function Projects({ sectionRef }) {
  return (
    <section ref={sectionRef} data-section="projects" className="sleek-section">
      <SectionHeading subHeading="Selected work" heading="Projects" />

      <div className="divide-y divide-[var(--border)]">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: index * 0.04,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="group relative py-10 first:pt-0 last:pb-0 sm:py-12"
          >
            {/* ================= HEADER ================= */}
            <div className="relative">
              {/* Project number */}
              <span className="absolute -left-1 top-0 hidden font-mono text-[10px] text-secondary/30 sm:block">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-[1fr_auto]">
                {/* Project information */}
                <div className="sm:pl-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-bold tracking-tight transition-colors duration-200 group-hover:text-[var(--foreground)] sm:text-2xl">
                      {project.title}
                    </h3>

                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-secondary/70">
                      {project.status}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-secondary/60">
                    <span>{project.type}</span>

                    <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />

                    <span>{project.timeline}</span>
                  </div>
                </div>

                {/* ================= ACTIONS ================= */}
                <div className="flex items-start gap-2 sm:justify-end">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} live preview`}
                    className="group/link inline-flex h-9 items-center gap-2 rounded-lg border border-white/10 bg-blue/[0.03] px-3 text-xs font-medium text-secondary transition-all duration-200 hover:border-white/25 hover:bg-white/[0.07] hover:text-[var(--foreground)]"
                  >
                    <span>Live</span>

                    <ExternalLink
                      size={13}
                      className=""
                    />
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} source code`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-secondary transition-all duration-200 hover:border-white/25 hover:bg-white/[0.07] hover:text-[var(--foreground)]"
                  >
                    <Github size={15} />
                  </a>
                </div>
              </div>
            </div>

            {/* ================= DESCRIPTION ================= */}
            <div className="mt-7 max-w-2xl sm:ml-8">
              <p className="text-sm leading-6 text-secondary sm:text-[15px] sm:leading-7">
                {project.description}
              </p>
            </div>

            {/* ================= TECHNOLOGIES ================= */}
            <div className="mt-7 sm:ml-8">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-secondary/60">
                Technologies & Tools
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="sleek-chip px-2.5 py-1 text-[11px] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ================= HIGHLIGHTS ================= */}
            <div className="mt-7 sm:ml-8">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-secondary/60">
                What I built
              </p>

              {/* One clean vertical list = no alignment problems */}
              <div className="flex flex-col gap-2.5">
                {project.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-start gap-3 text-sm text-secondary"
                  >
                    <CheckCircle2
                      size={15}
                      strokeWidth={1.7}
                      className="mt-[3px] shrink-0 text-secondary/60"
                    />

                    <span className="leading-5">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>


          </motion.article>
        ))}
      </div>
    </section>
  );
}

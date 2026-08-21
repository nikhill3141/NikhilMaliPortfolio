import {
  ArrowBigRightDashIcon,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Code,
  Code2,
  Database,
  Download,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Sparkles,
  Twitter,
  Zap,
} from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaCss3,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaNodeJs,
  FaReact,
  FaTwitter,
} from "react-icons/fa";
import { playClickSound } from "../utils/playClickSound";
import { TypeAnimation } from "react-type-animation";
import RollingText from "../components/UI/RollingText";


const SummaryProjects = [
  {
    title: "CalyM",
    Goal: "Manage all your meetings and emails in just a few clicks with integrated AI agents",
    timeline: "23 March 2026 - ongoing",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Express.js",
      "Google API",
      "OpenAI API",
    ],
  },
  {
    title: "NM Auth Service",
    Goal: "Provides authentication and authorization without writing too much code, following OIDC guidelines",
    timeline: "June 2026 - ongoing",
    technologies: [
      "Node.js",
      "React",
      "Express.js",
      "OpenID Connect (OIDC)",
      "OAuth 2.0",
      "JWT",
    ],
  },
  {
    title: "NM Forms",
    Goal: "Provides seamless data analysis and shareable links to collect data with customized forms",
    timeline: "January 2026 - ongoing",
    technologies: ["Next.js", "Monorepo", "TypeScript", "tRPC", "PostgreSQL"],
  },
];

const socials = [
  { href: "https://github.com/nikhill3141", label: "GitHub", icon: Github },
  {
    href: "https://www.linkedin.com/in/nikhil-mali-aa878a236/",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://www.instagram.com/nikhilmali3141/",
    label: "Instagram",
    icon: Instagram,
  },
  { href: "https://x.com/NikhilMali7083", label: "X", icon: Twitter },
  {
    href: "mailto:nikhilmali3141@gmail.com",
    label: "Email",
    icon: Mail,
  },
  { href: "Nikhil_Mali_Resume_A.pdf", label: "Resume", icon: Download },
];
const Blogs = [
  {
    title: "Introduction to Node.js",
    discription:
      "A beginner-friendly walkthrough of what Node.js is and how it works under the hood.",
    uploadedAt: "July 28 2026",
  },
  {
    title: "Getting Started with tRPC",
    discription:
      "Build fully type-safe APIs between your client and server without writing a schema by hand.",
    uploadedAt: "August 3 2026",
  },
  {
    title: "OAuth 2.0 vs OIDC Explained",
    discription:
      "A practical breakdown of authentication vs authorization and where each protocol actually fits.",
    uploadedAt: "August 12 2026",
  },
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section data-section="home" className="animate-fade-in-blur pt-5 ">
      {/* img & title */}
      <div className="flex gap-6">
        <motion.img
          src="linkedInprofile-removebg.png"
          alt="Nikhil Mali"
          className="h-22 w-22 rounded-full bg-yellow-300 object-contain"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        />
        <div>
          <motion.h1
            className="text-1xl font-bold leading-tight sm:text-3xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            Nikhil Mali
          </motion.h1>

          <RollingText />
          <motion.div
            className="my-2 flex gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.38 }}
          >
            {/* socials */}
            {socials.map((social) => {
              const Icon = social.icon;
              return social.label === "Resume" ? (
                <a key={social.label} href={social.href} download>
                  <Icon size={20} />
                </a>
              ) : (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary transition hover:text-[var(--foreground)]"
                  aria-label={social.label}
                  title={social.label}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* tagline */}
      <motion.p
        className="mt-4 max-w-2xl text-base leading-8 text-secondary sm:text-lg"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.16 }}
      >
        I love to build cool stuff and explore new technologies.
      </motion.p>

      {/* Project Hook */}
      <motion.div
        className="mt-8 flex flex-col gap-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.3 }}
      >
        <div>
          <p className="text-sm text-secondary">Latest</p>
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
            Projects
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {SummaryProjects.map((project) => (
            <div
              key={project.title}
              onClick={() => navigate("/projects")}
              className="group relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-white/10 p-4 sm:p-5 backdrop-blur-sm transition-all duration-300 hover:border-gray-500/30"
            >
              <div className="flex flex-col items-start gap-1.5 min-w-0">
                <h3 className="text-lg font-bold">{project.title}</h3>

                <p className="text-sm text-secondary leading-relaxed">
                  {project.Goal}
                </p>

                <p className="text-xs text-secondary/70">{project.timeline}</p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide text-secondary bg-white/5 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/projects")}
                aria-label={`View ${project.title} project`}
                className="self-end sm:self-center shrink-0 flex items-center justify-center w-9 h-9 rounded-full text-gray-500 border border-white/10 bg-white/5 transition-all duration-300 group-hover:bg-gray-500/10 group-hover:border-gray-500/30 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <ArrowUpRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Blog Hook */}
      <motion.div
        className="mt-10 flex flex-col"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.35 }}
      >
        <div>
          <p className="text-sm text-secondary">Latest</p>
          <h2 className="text-2xl font-bold mb-2">Blogs</h2>
        </div>

        <div className="flex flex-col ">
          {Blogs.map((blog) => (
            <div
              key={blog.title}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:py-6 backdrop-blur-sm transition-all duration-300  "
            >
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-bold">{blog.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">
                  {blog.discription}
                </p>
                <p className="text-xs text-secondary/70 pt-1">
                  {blog.uploadedAt}
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/blogs")}
                aria-label={`Read ${blog.title}`}
                className="sm:self-center flex items-center justify-center  text-secondary text-sm"
              >
                Read more
                <ArrowRight size={20} />
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

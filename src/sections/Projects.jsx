import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

const projects = [
  {
    title: 'Instagram Clone',
    description: 'full stack Instagram web application which have the same features as the Instagram',
    tech: ['FullStack', 'Nodejs', 'JavaScript', 'TailwindCSS','React','Web-RTC','HTML','CSS','MongoDB'],
    link: 'https://insta-clone-made-by-nik.onrender.com',
  },
  {
    title: 'Harihar institute Website',
    description: 'Full stack student Data base web application for real time assignment, presenty, and Exam Mark analysis dashboard',
    tech: ['FullStack', 'Django', 'Sq-liteDB','Tailwind CSS', 'HTML','CSS'],
    link: 'https://harihar-institute.onrender.com',
  },
  {
    title: 'Camera order Management',
    description:'This project is more focus on the backend CURD operations for  the management of the customers, Dashboard for Analysis',
    tech: ['FullStack', 'Djanog','Python', 'Sq-lliteDB', 'TailwindCSS', 'HTML','CSS'],
    link: 'https://cameracustomermanagement.onrender.com',
  },
  {
    title: 'TSP SALON Website',
    description:'This is the marketing web page for the solon that have the quiz  feature for haircare and product suggestion to get traffic',
    tech: ['FrontEnd', 'React','JavaScript','TailwindCSS', 'HTML','CSS'],
    link: 'https://tsp-salon.onrender.com',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen bg-white dark:bg-[#0c0c0c] py-24 px-6">
      <h2 className="text-4xl font-bold text-center text-black dark:text-white mb-14">
        My <span className="text-blue-500">Projects</span>
      </h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {projects.map((project, index) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { margin: '-100px' });
          const controls = useAnimation();

          useEffect(() => {
            if (isInView) {
              controls.start({ opacity: 1, y: 0 });
            }
          }, [isInView, controls]);

          return (
            <motion.div
              key={project.title}
              ref={ref}
              animate={controls}
              initial={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl bg-gray-100 dark:bg-zinc-900 shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline mt-auto"
              >
                PreView →
              </a>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
